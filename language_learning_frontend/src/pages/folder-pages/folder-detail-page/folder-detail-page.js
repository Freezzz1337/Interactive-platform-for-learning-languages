import {useParams} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import {getSetsByFolder} from "../../../services/set-service";
import ButtonShowMore from "../../../components/button-components/button-show-more";
import {FiPlusCircle} from "react-icons/fi";
import "./folder-detail-page.css";
import WindowAddSetsToFolder from "../../../components/window-components/window-add-sets-to-folder";
import usePagination from "../../../hooks/usePagination";

const FolderDetailPage = () => {
    const {id} = useParams();
    const {getToken} = useAuth();
    const {page, size, setShowMoreButton, showMoreButton, handleNextPage} = usePagination();

    const [sets, setSets] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getSetsByFolder(id, page, size, getToken());
            if (serverResponse) {
                // setSets(prevSets => [...prevSets, ...serverResponse]);
                // setShowMoreButton(serverResponseGetSets.isLastPage); implement this one later !!!!!!!
            }
        }


        fetchData();
    }, [id]);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <Container>
            {
                sets.length === 0 ? (
                    <Row>
                        <Col className="text-center mt-5">
                            <h2>The folder is empty</h2>
                            <div className="button-add-folder-folder-detail-page-container">
                                <Button
                                    variant="outline-warning"
                                    onClick={handleShowModal}
                                >
                                    Add items <FiPlusCircle className="mb-1"/>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <h2>TEST2</h2>
                )
            }

            <WindowAddSetsToFolder show={showModal} handleClose={handleClose} />
            <ButtonShowMore showButton={showMoreButton} handleNextPage={handleNextPage}/>
        </Container>
    );
}
export default FolderDetailPage;