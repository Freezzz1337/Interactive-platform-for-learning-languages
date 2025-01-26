const createWordsValidation = (formData) => {
    const errors = {};

    if (!formData.name){
        errors.name = "The name field should not be empty";
    }
}

export {
    createWordsValidation
}