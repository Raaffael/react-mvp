const URL = 'http://localhost:3001'


const getData = () => {
    let listOfSchools = [];
    fetch('http://universities.hipolabs.com/search?country=united+states')
        .then(response => response.json())
        .then(data => {
            for(let i=0;i<20;i++){
                listOfSchools = [...listOfSchools,data[i]]
            }
            
        }).then(()=>{
            sendToDatabase(listOfSchools)
        })
}

getData();

const sendToDatabase = (arr) => {
    for(let i=0;i<arr.length;i++){
        let school = {
            name: arr[i].name,
            category: 'none',
            application_submitted: false
        }
        fetch(`${URL}/universities`, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(school)
        })
    };
}