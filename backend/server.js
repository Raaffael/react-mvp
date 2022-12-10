const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const config = require('./config')[process.env.NODE_ENV || "dev"]
//process.env.NODE_ENV pulls the build command from Render 
//in this case the script render uses is 'npm start:production' which runs 'node server.js' in render
//look in package.json under scripts and in the config.js file
//dev and production specify different settings for the port and URL
const PORT = config.port;
const pool = new Pool({
    connectionString: config.connectionString,
});
pool.connect();





app.get('/universities/all', (req, res) => {
    getSchoolList(req, res);
});
app.get('/universities/:type', (req, res) => {
    getSchoolByType(req, res);
});
app.post('/universities', (req, res) => {
    addSchoolsToDatabase(req, res);
});
app.patch('/universities', (req, res) => {
    patchSchool(req, res);
});
app.delete('/universities', (req, res) => {
    dropSchoolsFromList(req, res);
})
app.get('*', (req, res) => {
    res.send('Check url');
});



app.listen(PORT, () => {
    console.log(`Our app is running on ${PORT}`)
});

async function getSchoolList(req, res) {
    try {
        const text = 'SELECT * FROM university ORDER BY school_id ASC;';
        queryReturn(req, res, text);
    } catch (e) {
        console.error(e.stack);
    }
}
async function getSchoolByType(req, res) {
    try {
        const text = 'SELECT * FROM university WHERE category=$1 ORDER BY school_id ASC';
        const values = [req.params.type];
        queryReturn(req, res, text,values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function addSchoolsToDatabase(req, res) {
    try {
        const schoolToAdd = req.body;
        console.log(schoolToAdd)
        const text = 'INSERT INTO university (name,category,application_submitted) VALUES ($1,$2,$3) RETURNING *;'
        const values = [schoolToAdd.name,schoolToAdd.category,schoolToAdd.application_submitted];
        queryReturn(req, res, text, values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function patchSchool(req, res) {
    try {
        const schoolToPatch = req.body;
        let text = '';
        let values = [];
        if(schoolToPatch.school_id !==undefined && schoolToPatch.category !== undefined){
            text = 'UPDATE university SET category = $1 WHERE school_id = $2 RETURNING *;';
            values = [schoolToPatch.category, schoolToPatch.school_id]
        }else if(schoolToPatch.school_id !==undefined){
            text = 'UPDATE university SET application_submitted = NOT application_submitted WHERE school_id = $1 RETURNING *;'
            values = [schoolToPatch.school_id]
        }
        queryReturn(req, res, text, values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function dropSchoolsFromList(req, res) {
    try {
        const schoolToDrop = req.body;
        let text = '';
        if (schoolToDrop.school_id !== undefined) {
            text = 'DELETE FROM university WHERE school_id = $1 RETURNING *;';
        }
        queryReturn(req, res, text, [schoolToDrop.school_id]);
    } catch (e) {
        console.error(e.stack);
    }
}

async function queryReturn(req, res, text, values) {
    const result = await pool.query(text, values);
    console.log(result.rows);
    res.send(result.rows);
}