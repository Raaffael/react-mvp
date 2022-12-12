import { useEffect, useState } from 'react';
import School from './School';

const Category = (props) => {
    const [list, setList] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState({});
    

    const categoryProps = {
        list, setList,
        selectedSchool, setSelectedSchool
    }
    const patchOneSchool = (id, category) => {
        let school = {
            school_id: id,
            category: category
        }
        fetch(`${props.URL}/universities`, {
            method: 'PATCH',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(school)
        }).then(() => {
            props.setCount(props.count + 1);
            setSelectedSchool({});
        })
    }

    const handleClick = (event) => {
        const tag = event.target.value;
        if (tag === 'drop') {
            patchOneSchool(selectedSchool.school_id, 'none');
        } else if (tag === 'reach' || tag === 'target' || tag === 'safety') {
            patchOneSchool(selectedSchool.school_id, tag)
        }

    }
    useEffect(() => {
        fetch(`${props.URL}/universities/${props.type.toLowerCase()}`)
            .then(response => response.json())
            .then(data => {
                setList(data)
            })
    }, [props.count]);

    return (
        <div >
            <h1>{props.title}</h1>
            <table className='category'>
                <thead>
                        <tr>
                            <th>School Name</th>
                            <th>School ID</th>
                            <th>Application Submitted</th>
                        </tr>
                </thead>
                <tbody>
                    {list.map((item) => (
                        <School {...props} {...categoryProps} university={item} key={item.school_id} />
                    ))}
                </tbody>
            </table>
            {props.type === 'none' ?
                <div className='buttonDiv'>
                    <button  onClick={handleClick} value={'reach'}>Add to Reach</button>
                    <button onClick={handleClick} value={'target'}>Add to Target</button>
                    <button onClick={handleClick} value={'safety'}>Add to Safety</button>
                </div>
                :
                <div className='buttonDiv'>

                    <button className='dropButton' onClick={handleClick} value={'drop'}>Remove</button>
                </div>
                }
        </div>
    )
}

export default Category;