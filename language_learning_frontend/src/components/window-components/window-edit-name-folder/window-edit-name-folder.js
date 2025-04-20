import {Button, Form, Modal, ModalFooter} from "react-bootstrap";
import {useEffect, useState} from "react";
import {editFolderName} from "../../../services/folder-service";

const WindowEditNameFolder = ({show, handleClose, folderName = "", token, folderId,dataTriggerReload}) => {

    const [newFolderName, setNewFolderName] = useState("");

    useEffect(() => {
        if (!show) {
            setNewFolderName(folderName);
        }
    }, [show, folderName]);

    const handleChange = (e) => {
        e.preventDefault();
        setNewFolderName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const serverResponse = await editFolderName(JSON.stringify({
            folderId: folderId,
            folderName: newFolderName
        }), token);

        if (serverResponse.message) {
            handleClose();
            dataTriggerReload();
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit folder name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control onChange={handleChange}
                                      value={newFolderName}
                                      type="text"
                                      name="folderName"
                                      placeholder="Folder title"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <ModalFooter>
                <Button type="button"
                        variant="warning"
                        disabled={newFolderName.length < 1 || newFolderName === folderName}
                        onClick={handleSubmit}>Edit</Button>
            </ModalFooter>
        </Modal>
    );
}
export default WindowEditNameFolder