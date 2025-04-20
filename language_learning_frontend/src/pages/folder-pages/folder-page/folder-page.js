import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import {getFolders} from "../../../services/folder-service";
import {Col, Container, Row} from "react-bootstrap";
import {FaRegFolderOpen} from "react-icons/fa";
import "./folder-page.css";
import {useNavigate} from "react-router-dom";
import ButtonShowMore from "../../../components/button-components/button-show-more";
import usePagination from "../../../hooks/usePagination";
import {useFolderContext} from "../../../context/folder-context";

const FolderPage = () => {
    const {page, size, setShowMoreButton, showMoreButton, handleNextPage} = usePagination();

    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();
    const {folderReload} = useFolderContext();

    const {getToken} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getFolders(page, size, getToken());

            console.log(serverResponse);

            if (serverResponse) {
                setFolders(page === 0 ? serverResponse.folders : [...folders, ...serverResponse.folders]);
                setShowMoreButton(serverResponse.isLastPage);
            }
        }
        fetchData();
    }, [page, folderReload]);

    const handleFolderPage = (e, folderId) => {
        e.preventDefault();

        navigate(`/folder/${folderId}`);
    }

    return (
        <Container>
            <h2 className="mt-3">Folders: </h2>
            <hr/>
            {folders.map((folder, index) => (
                <Row key={index} className="folder-page mt-4" onClick={(e) => handleFolderPage(e, folder.id)}>
                    <Col xs={12} className="first-block mt-2 ">
                        {folder.numberOfItems && folder.numberOfItems > 0
                            ? folder.numberOfItems
                            : 0} items
                    </Col>
                    <Col xs={12} className="d-flex align-items-center">
                        <FaRegFolderOpen className="mb-2" size={"25px"}/>&nbsp;&nbsp;
                        <h4>{folder.name}</h4>
                    </Col>
                </Row>
            ))}

            <ButtonShowMore showButton={showMoreButton} handleNextPage={handleNextPage}/>
        </Container>
    );
}
export default FolderPage;

