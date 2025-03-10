import {Button, Form, Modal, ModalFooter} from "react-bootstrap";
import {useState} from "react";
import {createFolder} from "../../../services/folder-service";
import useAuth from "../../../hooks/useAuth";

const WindowCreateFolder = ({show, handleClose}) => {

    const {getToken} = useAuth();
    const [folderName, setFolderName] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setFolderName({...folderName, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(folderName);
            const serverResponse = await createFolder(JSON.stringify(folderName), getToken());
            console.log("Folder created successfully:", serverResponse.message);
            handleClose();
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create a folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control onChange={handleChange}
                                      type="text"
                                      name="folderName"
                                      placeholder="Folder title"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <ModalFooter>

                <Button type="button"
                        variant="warning"
                        active={folderName.length < 1}
                        onClick={handleSubmit}>Create</Button>
            </ModalFooter>
        </Modal>
    );
}
export default WindowCreateFolder;