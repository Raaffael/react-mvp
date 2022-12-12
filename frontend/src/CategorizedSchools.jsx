import Category from './Category.jsx';

const CategorizedSchools = (props) => {
    return (
        <div className='categorizedSchools'>
            <Category {...props} type={'reach'} title={'Reach Schools'}/>
            <Category {...props} type={'target'} title={'Target Schools'}/>
            <Category {...props} type={'safety'} title={'Safety Schools'}/>
        </div>
    )
}

export default CategorizedSchools;