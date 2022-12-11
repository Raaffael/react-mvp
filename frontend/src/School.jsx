

const School = (props) => {
    const handleClick = () => {
        props.setSelectedSchool(props.university);
    }
    const buttonClick = () => {
        toggleApplicationSubmitted(props.university.school_id);
    }
    const toggleApplicationSubmitted = (id) => {
        const school = {
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
    return (
        <div onClick={handleClick}>
            {props.university.name + ' school_id: ' + props.university.school_id + ' appSubmitted? : '}
            <button onClick={buttonClick}>{props.university.application_submitted+''}</button>
        </div>
    )
}

export default School;