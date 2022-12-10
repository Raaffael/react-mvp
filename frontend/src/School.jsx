

const School = (props) => {
    const handleClick = () => {
        setSchool();
    }
    const buttonClick = () => {
        toggleApplicationSubmitted(props.university.school_id);
    }
    const toggleApplicationSubmitted = (id) => {
        let school = {
            school_id : id
        }
        fetch(`${props.URL}/universities`,{
            method: 'PATCH',
            mode: "cors",
            headers: { 'Content-Type':'application/json'},
            body:JSON.stringify(school)
        }).then(() => {
            props.setCount(props.count + 1)
        })
    }
    const setSchool = () => {
        props.setSelectedSchool(props.university);
    }
    return (
        <div onClick={handleClick}>
            {props.university.name + ' school_id: ' + props.university.school_id + ' appSubmitted? : '}
            <button onClick={buttonClick}>{props.university.application_submitted+''}</button>
        </div>
    )
}

export default School;