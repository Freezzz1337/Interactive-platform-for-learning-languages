import {Col, Container, Form, Row} from "react-bootstrap";
import "./create-new-word.css";
const CreateNewWord = ({index}) => {

    return (
        <Container className="create-new-word-bg card mt-5 shadow">
            <p className="card-title mb-1 ">{index}</p>
            <hr className="mt-0 mb-2"/>
            <Form className="mt-0 mb-2">
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="mb-0">Term</Form.Label>
                            <Form.Control name="wordSource" type="text" placeholder="Write a term"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="mb-0">Definition</Form.Label>
                            <Form.Control name="wordTarget" type="text" placeholder="Write a definition"/>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
export default CreateNewWord;