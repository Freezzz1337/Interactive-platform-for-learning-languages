import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./registration.css"
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {register} from "../../services/auth-service";
import {authorizationValidation} from "../../util/validation/authorizationValidation";
import ErrorAlert from "../../components/alerts";
import useFormValidation from "../../hooks/useFormValidation";
import Spinner from "../../components/spinner";

const Registration = () => {
    const formRef = useRef(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {formData, validErrors, handleChange, handleValidation} = useFormValidation({}, authorizationValidation);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = handleValidation();
        if (isValid) {
            setLoading(true);
            try {
                const serverResponse = await register(JSON.stringify(formData));
                if (serverResponse.response) {
                    navigate("/authorization");
                } else {
                    setError(serverResponse.description);
                }
            } catch (error) {
                console.log("Login failed:", error);
                setError("Unexpected error occurred.");
            } finally {
                setLoading(false);
                formRef.current.reset();
            }
        }
    }

    return (
        <Container fluid className="registration-bg d-flex justify-content-center align-items-center">

            {error && <ErrorAlert error={error} setError={setError}/>}

            <Row className="w-75 g-0 registration-row ">
                <Col xl={6} className="d-none d-xl-block h-100">
                    <img
                        src={require('../../assets/img/registration-form1.jpg')}
                        alt="Registration"
                        className="registration-form-img "
                    />
                </Col>
                <Col xl={6}>
                    <Card className="border-0 h-100 rounded-0 border-start position-relative">
                        <Card.Body>
                            <h2 className="text-uppercase text-center">Registration</h2>
                            <hr/>
                            <Form onSubmit={handleSubmit} ref={formRef} className="position-relative">
                                <Spinner isLoading={loading} positionAbsolute={true} overlay={true}/>

                                <Form.Group className="mt-4">
                                    <Form.Label className="mb-0">
                                        Username
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        className={`${validErrors.username ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {validErrors.username &&
                                        <Form.Control.Feedback
                                            type="invalid">{validErrors.username}</Form.Control.Feedback>}
                                </Form.Group>


                                <Form.Group className="mt-4">
                                    <Form.Label className="mb-0">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className={`${validErrors.password ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {validErrors.password &&
                                        <Form.Control.Feedback
                                            type="invalid">{validErrors.password}</Form.Control.Feedback>}
                                </Form.Group>

                                <Form.Group className="mt-4">
                                    <Form.Label className="mb-0">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`${validErrors.email ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {validErrors.email &&
                                        <Form.Control.Feedback
                                            type="invalid">{validErrors.email}</Form.Control.Feedback>}
                                </Form.Group>

                                <Form.Group className="mt-4">
                                    <Form.Label className="mb-0">Profile picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        name="profilePicture"
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mt-4">
                                    <Form.Label className="mb-0">Date of birthday</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateOfBirthday"
                                        onChange={handleChange}
                                        className={`${validErrors.dateOfBirthday ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {validErrors.dateOfBirthday &&
                                        <Form.Control.Feedback
                                            type="invalid">{validErrors.dateOfBirthday}</Form.Control.Feedback>}
                                </Form.Group>

                                <div className="text-center mt-3 mt-xl-5">
                                    <Button
                                        type="submit"
                                        variant="info"
                                        className="btn-lg w-75 text-body"
                                        disabled={loading}
                                    >Register</Button>
                                </div>

                                <p className="text-center text-muted mt-2 mt-xl-4  mb-0">Already have an
                                    account? <Link
                                        to="/authorization" className="fw-bold">
                                        <u>Login</u>
                                    </Link></p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default Registration;