import {Button, Col, Container, Form, Row} from "react-bootstrap";
import CreateNewWord from "../../components/create-new-word";
import "./create-set.css";
import useFormValidation from "../../hooks/useFormValidation";
import {useState} from "react";

const CreateSet = () => {

    let [wordCounter, setWordCounter] = useState(1);

    const {
        formData,
        validErrors,
        handleChange,
        handleValidation
    } = useFormValidation({});


    const handleAddWord = (e) => {
        e.preventDefault();
        setWordCounter((prevCounter) => prevCounter + 1);
        console.log(wordCounter);
    }

    return (
        <Container>
            <h2 className="mt-3 mb-3">Create new flashcard</h2>
            <hr/>
            <Form onChange={handleChange}>
                <Form.Group>
                    <Form.Label className="h3">Title</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Write a title"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="h4">Description</Form.Label>
                    <Form.Control as="textarea"
                                  name="description"
                                  rows={4}
                                  maxLength="400"
                                  placeholder="Write a description"
                                  style={{resize: "none"}}
                    />
                </Form.Group>

                {[...Array(wordCounter)].map((_, index) => (
                    <CreateNewWord key={index} index={index + 1}/>
                ))}

                <div className="add-button mt-5 mb-5 text-center">
                    <Button type="button"
                            variant="outline-dark"
                            className="btn-lg w-50"
                            onClick={handleAddWord}
                    >ADD WORD</Button>
                </div>
            </Form>
        </Container>
    );
}
export default CreateSet;