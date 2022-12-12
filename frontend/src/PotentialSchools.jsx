import Category from './Category.jsx';

const SchoolList = (props) => {
    
    return (
        <div className='potentialSchools'>
            <li>This app helps you keep track of your colleges of choice</li>
            <li>Click to select ONE school from potential schools and add to one of three categories using buttons below</li>
            <li>Refreshing the page will empty table in database and pull random schools from API</li>
            <li>Application submitted button simulates the user being able to keep track of whether or not an application has been submitted</li>
            <Category {...props} type ={'none'} title={'Potential Schools'}/>
        </div>
    )
}

export default SchoolList;