import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./auth-login-register.css"
import {useRef, useState} from "react";
import {authenticate, register} from "../../services/auth-service";
import {authorizationValidation, registrationValidation} from "../../util/validation/auth-login-register-validation";
import ErrorAlert from "../../components/alerts";
import useFormValidation from "../../hooks/useFormValidation";
import Spinner from "../../components/spinner";
import RegistrationForm from "../../components/forms/registration-form/registration-form";
import AuthorizationForm from "../../components/forms/authorization-form";
import ButtonAnim from "../../components/button-anim";
import {useLocation} from "react-router-dom";
import ButtonGoBack from "../../components/button-go-back";

const AuthLoginRegister = () => {
    const formRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const [isAuthenticatedPage, setIsAuthenticatedPage] = useState(
        location.state?.isAuthenticatedPage || false
    );
    const {
        formData,
        validErrors,
        handleChange,
        handleValidation
    } = useFormValidation({}, isAuthenticatedPage ? registrationValidation : authorizationValidation);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = handleValidation();
        console.log(isValid);
        if (isValid) {
            setLoading(true);
            try {
                let serverResponse;

                if (isAuthenticatedPage) {
                    serverResponse = await authenticate(JSON.stringify(formData));
                    if (!serverResponse.response) {
                        setError(serverResponse.description);
                    }
                    console.log(serverResponse)
                } else if (!isAuthenticatedPage) {
                    console.log("!!!!!!!!!!!!!");

                    serverResponse = await register(JSON.stringify(formData));
                    if (serverResponse.response) {
                        setIsAuthenticatedPage(!isAuthenticatedPage);
                    } else {
                        setError(serverResponse.description);
                    }
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

            <ButtonGoBack left="50px" top="50px"/>

            {error && <ErrorAlert error={error} setError={setError}/>}

            <Row className="w-75 g-0 registration-row">
                <Col xl={6} className="d-none d-xl-block h-100">
                    <img
                        src={require('../../assets/img/registration-form1.jpg')}
                        alt="AuthLoginRegister"
                        className="registration-form-img "
                    />
                </Col>
                <Col xl={6}>
                    <Card className="border-0 h-100 rounded-0 border-start ">
                        <Card.Body>
                            <h2 className="text-uppercase text-center">{isAuthenticatedPage ? 'Log in' : 'Registration'}</h2>
                            <hr/>
                            <Form onSubmit={handleSubmit} ref={formRef} className="position-relative">
                                <Spinner isLoading={loading} positionAbsolute={true} overlay={true}/>
                                {isAuthenticatedPage ?
                                    <RegistrationForm handleChange={handleChange} loading={loading}
                                                      validErrors={validErrors} className="validation-message"/>
                                    :
                                    <AuthorizationForm handleChange={handleChange} loading={loading}
                                                       validErrors={validErrors} className="validation-message"/>}

                                <div className="text-center mt-2 mt-sm-4">
                                    <ButtonAnim
                                        className="w-75 col-12 col-md-6 col-lg-4"
                                        height={"46px"}
                                        disabled={loading}
                                        buttonText={isAuthenticatedPage ? "Log in" : "Register"}
                                        type={"submit"}
                                    />
                                </div>

                                <p className="text-center text-muted mt-2 mt-xl-4 mb-0">
                                    {isAuthenticatedPage ? "Don't have an account? " : "Already have an account? "}
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            setIsAuthenticatedPage(!isAuthenticatedPage)
                                        }}
                                        className="fw-bold p-0 mb-1"
                                        style={{color: "#845BB3"}}>
                                        <u>{isAuthenticatedPage ? "Sing up " : "Log in"}</u>
                                    </Button></p>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default AuthLoginRegister;