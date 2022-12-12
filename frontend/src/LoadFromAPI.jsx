import { useEffect, useState } from "react";
import PostToDatabase from './PostToDatabase';
import data from './schoolsFromAPI.json';


const LoadFromAPI = (props) => {
    const [APIloaded, setAPIloaded] = useState(false);

    const wipeTable =  () => {
         fetch(`${props.URL}/universities`, {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => {
                getData();
            })
    }
    const getData =  () => {
        //  fetch('http://universities.hipolabs.com/search?country=united+states')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //         props.setSchools(data)
        //     }).then(() => {
        //         setAPIloaded(true);
        //     })
        props.setSchools(data);
    }

    useEffect(() => {
        wipeTable();
    }, []);
    return (
        <div>
            {APIloaded ?
                <div>
                    <PostToDatabase {...props}/>
                </div>
                :
                <div>
                    Loading From API...
                </div>}

        </div>
    )
}

export default LoadFromAPI;
