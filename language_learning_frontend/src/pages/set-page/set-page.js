import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSet} from "../../services/set-service";
import useAuth from "../../hooks/useAuth";
import {Container} from "react-bootstrap";
import Spinner from "../../components/spinner/spinner";
import Flashcard from "../../components/flashcard";


const SetPage = () => {

    const {id} = useParams();
    const [currentSet, setCurrentSet] = useState(null);
    const {getToken} = useAuth();
    const [wordList, setWordList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const serverResponseGetSet = await getSet(id, getToken());

            if (serverResponseGetSet) {
                setCurrentSet(serverResponseGetSet);
                setWordList(serverResponseGetSet.wordList);
            }
        }

        fetchData();
        console.log(currentSet);
    }, []);



    return (
        <Container fluid>
            {
                !currentSet ? (<Spinner positionAbsolute={true} overlay={true} size={"5rem"}/>) : (
                    <>
                        <h2 className="mb-3 text-center">{currentSet.name}</h2>
                        {currentSet.description ?
                            <h5 className="mt-3 text-center">{currentSet.description}</h5> : null
                        }
                        <Flashcard wordList={wordList} />
                    </>
                )
            }
        </Container>)
}
export default SetPage;
