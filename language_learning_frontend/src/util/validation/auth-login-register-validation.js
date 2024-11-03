const authorizationValidation = (formData) => {
    const errors = {};

    if (!formData.username) {
        errors.username = "The username field should not be empty";
    }
    if (!formData.dateOfBirthday) {
        errors.dateOfBirthday = "The dateOfBirthday must be at least 8 characters";
    } else if (new Date() <= new Date(formData.dateOfBirthday)) {
        errors.dateOfBirthday = "test";
    }

    return {...errors, ...validateEmailAndPassword(formData)};
}

const registrationValidation = (formData) => {
    return validateEmailAndPassword(formData);
}
const validateEmailAndPassword = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "The email field should not be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email address";
    }

    if (!formData.password) {
        errors.password = "The password field should not be empty";
    } else if (formData.password.length < 8) {
        errors.password = "The password must be at least 8 characters";
    }

    return errors;
};


export {
    authorizationValidation,
    registrationValidation
}
