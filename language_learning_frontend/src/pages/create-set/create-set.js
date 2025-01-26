import {Button, Col, Container, Form, Row} from "react-bootstrap";
import CreateNewWord from "../../components/create-new-word";
import "./create-set.css";
import useFormValidation from "../../hooks/useFormValidation";
import {v4 as uuidv4} from 'uuid';
import {createWordsValidation} from "../../util/validation/create-words-validation";
import {useState} from "react";

const CreateSet = () => {
    const {
        formData,
        setFormData,
        validErrors,
        handleChange,
        handleValidation
    } = useFormValidation({words: [{id: uuidv4(), wordSource: '', wordTarget: ''}]},
        createWordsValidation);
    const [error, setError] = useState(null);
    const handleAddWord = (e) => {
        e.preventDefault();

        setFormData((prevState) => ({
            ...prevState,
            words: [...(prevState.words || []), {id: uuidv4(), wordSource: "", wordTarget: ""}]
        }));
    }
    const handleDeleteWord = (e, index) => {
        e.preventDefault();
        setFormData((prevData) => {
            const updateWords = prevData.words.filter((_, i) => i !== index);
            return {...prevData, words: updateWords};
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const isValid = handleValidation();
        if (isValid) {
            try {
                let serverResponse;
            } catch (error) {
                console.log("Login failed:", error);
                setError("Unexpected error occurred.");
            }
        }
    }

    return (
        <Container>
            <h2 className="mt-3 mb-3">Create new flashcard</h2>
            <hr/>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
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


                {formData.words.map((word, index) => (
                    <CreateNewWord
                        key={word.id}
                        index={index}
                        handleDeleteWord={(e) => handleDeleteWord(e, index)}
                    />
                ))}

                <div className="add-button mt-5 mb-5 text-center">
                    <Button type="button"
                            variant="outline-dark"
                            className="btn-lg w-50"
                            onClick={handleAddWord}
                    >ADD WORD</Button>
                </div>

                <hr/>
                <div className="add-button mt-5 mb-5 d-flex justify-content-end gap-3 flex-wrap">
                    <Button type="button"
                            variant="outline-dark"
                            className="btn-lg  col-12 col-sm-3"
                            data-type="create"
                            onClick={handleSubmit}
                    >Create</Button>
                    <Button type="button"
                            variant="outline-dark"
                            className="btn-lg col-12 col-sm-3"
                            onClick={handleSubmit}
                    >Create and practice</Button>
                </div>
            </Form>
        </Container>
    );
}
export default CreateSet;