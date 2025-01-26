import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./create-new-word.css";
import {IoMdClose} from "react-icons/io";

const CreateNewWord = ({ index, handleDeleteWord }) => {
    return (
        <Container className="create-new-word-bg card mt-5 shadow">
            <div className="card-title mb-1">
                <div className="float-start" style={{ marginTop: "5px", marginLeft: "5px" }}>
                    {index + 1}
                </div>
                <div className="float-end">
                    <Button
                        onClick={(e) => handleDeleteWord(e, index)}
                        variant="outline-dark"
                        className="mt-1 d-flex align-items-center justify-content-center border-0"
                    >
                        <IoMdClose />
                    </Button>
                </div>
            </div>
            <hr className="mt-0 mb-2" />
            <div className="mt-0 mb-2">
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="mb-0">Term</Form.Label>
                            <Form.Control
                                data-type="word"
                                data-index={index}
                                name="wordSource"
                                type="text"
                                placeholder="Write a term"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="mb-0">Definition</Form.Label>
                            <Form.Control
                                data-type="word"
                                data-index={index}
                                name="wordTarget"
                                type="text"
                                placeholder="Write a definition"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};
export default CreateNewWord;

