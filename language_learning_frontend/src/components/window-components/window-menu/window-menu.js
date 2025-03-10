import {Col, Container, Form, Modal, Row} from "react-bootstrap";

const WindowMenu = ({show, handleClose, options, handleOptions}) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                            <Col>
                                <Form.Check
                                    onChange={handleOptions}
                                    type="switch"
                                    id="shuffleWords"
                                    label="Shuffle Words"
                                    checked={options.shuffleWords}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    onChange={handleOptions}
                                    type="switch"
                                    id="swapSides"
                                    label="Swap Sides"
                                    checked={options.swapSides}
                                />
                            </Col>
                    </Row>
                </Container>
            </Modal.Body>

        </Modal>
    );
}
export default WindowMenu;