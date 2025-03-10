import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSets} from "../../../services/set-service";
import useAuth from "../../../hooks/useAuth";
import SetPreview from "../../../components/set-preview";
import {useNavigate} from "react-router-dom";
import "./set-page.css";
import ButtonShowMore from "../../../components/button-components/button-show-more";
import usePagination from "../../../hooks/usePagination";

const SetPage = () => {
    const [sets, setSets] = useState([]);

    const navigate = useNavigate();
    const {getToken} = useAuth();

    const {page, size, setShowMoreButton, showMoreButton, handleNextPage} = usePagination();

    useEffect(() => {
        const fetchData = async () => {
            const serverResponseGetSets = await getSets(page, size, getToken());

            if (serverResponseGetSets) {
                setSets([...sets, ...serverResponseGetSets.setDtoList]);
                setShowMoreButton(serverResponseGetSets.isLastPage);
            }
        }
        fetchData()
    }, [page])


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

            <ButtonShowMore showButton={showMoreButton} handleNextPage={handleNextPage}/>
        </Container>
    )
}
export default SetPage;