import {useParams} from "react-router-dom";
import {useEffect} from "react";

const SetPage = () => {

    const {id} = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    return(
        <h2>
            SetPage
        </h2>
    )
}
export default SetPage;