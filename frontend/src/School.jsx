

const School = (props) => {
    const handleClick = () => {
        props.setSelectedSchool(props.university);
    }
    const buttonClick = () => {
        toggleApplicationSubmitted(props.university.school_id);
    }
    const toggleApplicationSubmitted = (id) => {
        const school = {
            school_id: id
        }
        fetch(`${props.URL}/universities`, {
            method: 'PATCH',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(school)
        }).then(() => {
            props.setCount(props.count + 1)
        })
    }
    return (
        <tr onClick={handleClick}>
            <td>{props.university.name}</td>
            <td>{props.university.school_id}</td>
            <td><button onClick={buttonClick}>{props.university.application_submitted + ''}</button></td>
        </tr>
    )
}
export default School;