import {Col, Container, Form, Modal, Row} from "react-bootstrap";

const WindowAddSetsToFolder = ({show, handleClose}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add sets</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>

        </Modal>
    );
}
export default WindowAddSetsToFolder;