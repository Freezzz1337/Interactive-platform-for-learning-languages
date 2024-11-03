import {Form} from "react-bootstrap";

const AuthorizationForm = ({handleChange, validErrors}) => {
    return (
        <>
            <Form.Group className="mt-3">
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
                <div className="validation-message">
                    {validErrors.username &&
                        <Form.Control.Feedback
                            type="invalid">{validErrors.username}</Form.Control.Feedback>}
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
                <Form.Label className="mb-0">Profile picture</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    name="profilePicture"
                    onChange={handleChange}
                />
                <div className="validation-message"></div>
            </Form.Group>

            <Form.Group>
                <Form.Label className="mb-0">Date of birthday</Form.Label>
                <Form.Control
                    type="date"
                    name="dateOfBirthday"
                    onChange={handleChange}
                    className={`${validErrors.dateOfBirthday ? 'is-invalid' : ''}`}
                    required
                />
                <div className="validation-message">
                    {validErrors.dateOfBirthday &&
                        <Form.Control.Feedback
                            type="invalid">{validErrors.dateOfBirthday}</Form.Control.Feedback>}
                </div>
            </Form.Group>
        </>
    );
};
export default AuthorizationForm;