import {Button, Form, Modal, ModalFooter} from "react-bootstrap";
import {useEffect, useState} from "react";
import {createFolder} from "../../../services/folder-service";
import useAuth from "../../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {useFolderContext} from "../../../context/folder-context";

const WindowCreateFolder = ({show, handleClose}) => {

    const {getToken} = useAuth();
    const [folderName, setFolderName] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const {triggerReload} = useFolderContext();

    const handleChange = (e) => {
        e.preventDefault();
        setFolderName({...folderName, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const serverResponse = await createFolder(JSON.stringify(folderName), getToken());
            console.log("Folder created successfully:", serverResponse.message);

            if (location.pathname === "/folders") {
                triggerReload();
            } else {
                navigate("/folders");
            }

            handleClose();
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    }

    useEffect(() => {
        if (!show) {
            setFolderName({});
        }
    }, [show])

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
                <Form onSubmit={handleSubmit}>
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
                        disabled={!folderName.folderName}
                        onClick={handleSubmit}
                >Create</Button>
            </ModalFooter>
        </Modal>
    );
}
export default WindowCreateFolder;