import {useNavigate, useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import {getSetsByFolder} from "../../../services/set-service";
import ButtonShowMore from "../../../components/button-components/button-show-more";
import "./folder-detail-page.css";
import usePagination from "../../../hooks/usePagination";
import SetPreview from "../../../components/set-preview";
import Spinner from "../../../components/spinner";
import HeaderFolder from "../../../components/header-folder";
import {deleteSetFromFolder} from "../../../services/folder-service";

const FolderDetailPage = () => {
    const {id} = useParams();
    const {getToken} = useAuth();
    const {page, size, setShowMoreButton, showMoreButton, handleNextPage} = usePagination(0,2);
    const navigate = useNavigate();

    const [sets, setSets] = useState([]);
    const [folderName, setFolderName] = useState("");

    const [showSpinner, setShowSpinner] = useState(true);
    const [dataTriggerReload, setDataTriggerReload] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const serverResponse = await getSetsByFolder(id, page, size, getToken());
            if (serverResponse) {
                setShowSpinner(false);

                setSets(prevState => (page === 0 ? serverResponse.sets : [...prevState, ...serverResponse.sets]));
                setFolderName(serverResponse.folderName);
                setShowMoreButton(serverResponse.isLastPage);
            }
            console.log(serverResponse);

        }

        fetchData();
    }, [id, page, dataTriggerReload]);

    const handleSetDetails = (id, event) => {
        event.preventDefault();
        navigate(`/set/${id}`)
    }
    const handleDataTriggerReload = () => {
        setDataTriggerReload(!dataTriggerReload);
    }

    const handleDeleteSetFromFolder = async (e, setId) => {
        e.preventDefault();
        e.stopPropagation();


        const serverResponse = await deleteSetFromFolder(id, setId, getToken());
        if (serverResponse) {
            handleDataTriggerReload();
        }

    }

    return (
        <Container style={{position: "relative"}}>
            <Spinner isLoading={showSpinner} positionAbsolute={true} size={"100px"} overlay={true}/>

            <div className="mt-5">
                <HeaderFolder
                    folderName={folderName}
                    folderId={id}
                    token={getToken()}
                    dataTriggerReload={handleDataTriggerReload}
                />
            </div>

            {
                sets.length === 0 ? (

                    <h2 className="text-center mt-5">The folder is empty</h2>

                ) : (
                    <div className="mt-5">
                        {sets.map((set, index) => (
                            <div className="mt-3" key={index}
                                 onClick={(event) => handleSetDetails(set.id, event)}>
                                <SetPreview set={set}
                                            showFolderDetailIcons={true}
                                            handleDeleteSetFromFolder={handleDeleteSetFromFolder}
                                />
                            </div>
                        ))}
                    </div>
                )
            }
            <ButtonShowMore showButton={showMoreButton} handleNextPage={handleNextPage}/>

        </Container>
    );
}
export default FolderDetailPage;