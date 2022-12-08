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





app.get('/universities', (req, res) => {
    getSchoolList(req, res);
});
app.get('/universities/:type', (req, res) => {
    getSchoolByType(req, res);
});
app.post('/universities', (req, res) => {
    addSchoolsToList(req, res);
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
        const text = 'SELECT * FROM universities;';
        queryReturn(req, res, text);
    } catch (e) {
        console.error(e.stack);
    }
}
async function getSchoolByType(req, res) {
    try {
        const text = '';
        const values = [''];
        queryReturn(req, res, text,values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function addSchoolsToList(req, res) {
    try {
        const classToAdd = req.body;
        const text = ''
        const values = [];
        queryReturn(req, res, text, values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function patchSchool(req, res) {
    try {
        const classToPatch = req.body;
        let text = '';
        let values = [];
        queryReturn(req, res, text, values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function dropSchoolsFromList(req, res) {
    try {
        const classToDrop = req.body;
        let text = '';
        queryReturn(req, res, text, [classToDrop.reg_id]);
    } catch (e) {
        console.error(e.stack);
    }
}

async function queryReturn(req, res, text, values) {
    const result = await pool.query(text, values);
    console.log(result.rows);
    res.send(result.rows);
}