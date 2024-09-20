const authorizationValidation = (formData) => {
    const errors = {};

    if (!formData.username) {
        errors.username = "The username field should not be empty";
    }
    if (!formData.email) {
        errors.email = "The email field should not be empty";
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
        errors.email = "Invalid email address";
    }
    if (!formData.password) {
        errors.password = "The password field should not be empty";
    } else if (formData.password.length < 8) {
        errors.password = "The password must be at least 8 characters";
    }
    if (!formData.dateOfBirthday) {
        errors.password = "The dateOfBirthdaymust be at least 8 characters";
    }
    return errors;
}

export {
    authorizationValidation
}
