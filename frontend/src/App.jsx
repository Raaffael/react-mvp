import { useState } from 'react'
import data from "./universities.json";
import PotentialSchools from './PotentialSchools.jsx';
import CategorizedSchools from './CategorizedSchools.jsx';

function App() {
  const [count, setCount] = useState(0);
  const URL = 'http://localhost:3001';

  const properties = {
    count,
    setCount,
    URL
  }

  
  return (
    <div className="App">
      <PotentialSchools {...properties}/>
      <CategorizedSchools {...properties}/>      
    </div>
  )
}

export default App;
