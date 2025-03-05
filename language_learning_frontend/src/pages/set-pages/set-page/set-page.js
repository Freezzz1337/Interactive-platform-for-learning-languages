import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSets} from "../../../services/set-service";
import useAuth from "../../../hooks/useAuth";
import SetPreview from "../../../components/set-preview";
import {useNavigate} from "react-router-dom";
import {IoReloadOutline} from "react-icons/io5";
import "./set-page.css";

const SetPage = () => {
    const [sets, setSets] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2);
    const [showButton, setShowButton] = useState(true);

    const navigate = useNavigate();
    const {getToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const serverResponseGetSets = await getSets(page, size, getToken());

            if (serverResponseGetSets) {
                setSets([...sets, ...serverResponseGetSets.setDtoList]);
                setShowButton(serverResponseGetSets.isLastPage);
                console.log(serverResponseGetSets);
            }
        }
        fetchData()
    }, [page])

    const handleNextPage = (e) => {
        e.preventDefault();
        setPage(prevState => prevState + 1);
    }

    const getTimeCategory = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Today";
        if (diffInDays < 7) return "This Week";
        if (diffInDays < 30) return "This Month";
        return "Older";
    }

    const groupSetsByTime = (sets) => {
        return sets.reduce((acc, set) => {
            const category = getTimeCategory(set.createdAt);
            if (!acc[category]) acc[category] = [];
            acc[category].push(set);
            return acc;
        }, {});
    }

    const groupedSets = groupSetsByTime(sets);

    const handleSetDetails = (id, event) => {
        event.preventDefault();
        navigate(`/set/${id}`);
    }

    return (
        <Container>
            {Object.keys(groupedSets).map((category) => (
                <div className="mt-5" key={category}>
                    <h3>{category}</h3>
                    <hr/>
                    <Row className="mt-0">
                        {groupedSets[category].map((set, index) => (
                            <Col xs={12} key={index}>
                                <SetPreview set={set} handleSetDetails={handleSetDetails}/>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}
            <div className="button-set-page-container d-flex justify-content-center mt-3 mb-3">
                <Button hidden={showButton}
                        variant="outline-warning"
                        onClick={handleNextPage}>
                    <IoReloadOutline size={"50px"}/>&nbsp;&nbsp;Show more
                </Button>
            </div>

        </Container>
    )
}
export default SetPage; 