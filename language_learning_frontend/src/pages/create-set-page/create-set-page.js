import {Button, Col, Container, Form, Row} from "react-bootstrap";
import CreateNewWord from "../../components/create-new-word";
import "./create-set-page.css";
import useFormValidation from "../../hooks/useFormValidation";
import {v4 as uuidv4} from 'uuid';
import {createWordsValidation} from "../../util/validation/create-words-validation";
import {useState} from "react";
import {createSet} from "../../services/set-service";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import "../auth-login-register-page/auth-login-register-page.css"

const CreateSetPage = () => {
    const {
        formData,
        setFormData,
        validErrors,
        handleChange,
        handleValidation
    } = useFormValidation({isVisible: true, words: [{id: uuidv4(), wordSource: '', wordTarget: ''}]},
        createWordsValidation);
    const [error, setError] = useState(null);
    const {getToken} = useAuth();
    const navigate = useNavigate();
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

        const isValid = handleValidation();

        if (isValid) {
            try {
                const response = await createSet(JSON.stringify(formData), getToken());
                const {dataset} = e.target;

                if (dataset.type === "create") {
                    navigate("/home");
                } else if (dataset.type === "create-and-practice") {
                    navigate(`/set/${response}`);
                }
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
                    <Form.Control name="name"
                                  type="text"
                                  className={`${validErrors.email ? 'is-invalid' : ''}`}
                                  placeholder="Write a title"/>
                        {validErrors.name &&
                            <Form.Control.Feedback style={{display:"block"}}
                                type="invalid">{validErrors.name}</Form.Control.Feedback>}
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
                <Form.Group className="mt-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox"
                                name="isVisible"
                                label="Do you want to make this set private?"/>
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
                            data-type="create-and-practice"
                            onClick={handleSubmit}
                    >Create and practice</Button>
                </div>
            </Form>
        </Container>
);
}
export default CreateSetPage;