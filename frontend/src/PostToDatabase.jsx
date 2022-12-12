import { useEffect } from "react";

const PostToDatabase = (props) => {

    const passToDatabase =  (data) => {
            let school = {
                name: data[Math.floor(Math.random() * 2190)].name,
                category: 'none',
                application_submitted: false
            }
            fetch(`${props.URL}/universities`, {
                method: 'POST',
                mode: "cors",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(school)
            })
                .then(() => {
                    props.setSchoolCount(props.schoolCount + 1);
                })
    }

    useEffect(() => {
        passToDatabase(props.schools);
    },[props.schoolCount])

    return (
        <div>
            Posting to Database...
        </div>
    )
}
export default PostToDatabase;