import { useEffect, useState } from "react";
import PostToDatabase from './PostToDatabase';


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
         fetch(`${props.URL}/api`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.setSchools(data)
            }).then(() => {
                setAPIloaded(true);
            })
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
