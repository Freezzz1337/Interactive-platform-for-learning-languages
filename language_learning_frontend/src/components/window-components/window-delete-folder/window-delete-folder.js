import {Button, Modal} from "react-bootstrap";
import {deleteFolder} from "../../../services/folder-service";
import {useNavigate} from "react-router-dom";

const WindowDeleteFolder = ({show, handleClose, dataTriggerReload, folderId, token}) => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await deleteFolder(folderId, token);

        if (serverResponse) {
            handleClose();
            dataTriggerReload();
            navigate("/folders");
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title> Do you want to delete this folder?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <Button type="button"
                            variant="outline-dark"
                            onClick={handleSubmit}
                            className="w-25 me-5">Yes</Button>
                    <Button
                        type="button"
                        variant="outline-dark"
                        onClick={handleClose}
                        className="w-25">No</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default WindowDeleteFolder;