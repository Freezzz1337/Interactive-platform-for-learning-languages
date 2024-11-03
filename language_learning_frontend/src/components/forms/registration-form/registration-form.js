import {Form} from "react-bootstrap";

const RegistrationForm = ({handleChange, validErrors}) => {
    return (
        <>
            <Form.Group>
                <Form.Label className="mb-0">Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`${validErrors.email ? 'is-invalid' : ''}`}
                    required
                />
                <div className="validation-message">
                    {validErrors.email &&
                        <Form.Control.Feedback
                            type="invalid">{validErrors.email}</Form.Control.Feedback>}
                </div>
            </Form.Group>

            <Form.Group>
                <Form.Label className="mb-0">Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`${validErrors.password ? 'is-invalid' : ''}`}
                    required
                />
                <div className="validation-message">
                    {validErrors.password &&
                        <Form.Control.Feedback
                            type="invalid" className="d-block mt-0">{validErrors.password}</Form.Control.Feedback>
                    }
                </div>
            </Form.Group>
        </>
    );
};
export default RegistrationForm;