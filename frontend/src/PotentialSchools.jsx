import Category from './Category.jsx';

const SchoolList = (props) => {
    
    return (
        <div>
            <Category {...props} type ={'none'} title={'Potential Schools'}/>
        </div>
    )
}

export default SchoolList;