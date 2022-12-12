import { useState } from 'react'
import PotentialSchools from './PotentialSchools.jsx';
import CategorizedSchools from './CategorizedSchools.jsx';
import LoadFromAPI from './LoadFromAPI.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [schoolCount, setSchoolCount] = useState(0);
  const [schools, setSchools] = useState([]);
  const URL = 'postgres://mvp_react_db_user:wmpV722V1l4F7vnicemVZX5lmHMxEtrR@dpg-cebbo02rrk0bbteas02g-a/mvp_react_db';
  //const URL = 'http://localhost:3001';
  const howManySchools = 10;


  const properties = {
    count, setCount,
    schoolCount, setSchoolCount,
    schools, setSchools,
    URL,
    howManySchools,
  }


  return (
    <div className="App">
      {schoolCount<howManySchools ?
        <div>
          <LoadFromAPI {...properties}/>
        </div>
        :
        <div className='AppLoaded'>
          <PotentialSchools {...properties} />
          <CategorizedSchools {...properties} />
        </div>
      }
    </div>
  )
}

export default App;
