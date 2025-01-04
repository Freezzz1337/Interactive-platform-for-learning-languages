import {useState} from "react";
import {convertFileToBase64} from "../util/convert-file-to-base64";

const useFormValidation = (initialState, validate) => {
    const [formData, setFormData] = useState(initialState);
    const [validErrors, setValidErrors] = useState({});

    const handleChange = (e) => {
        if (e.target.type === "file") {
            convertFileToBase64(e.target.files[0], (base64String) => {
                setFormData({...formData, [e.target.name]: base64String});
            });
        } else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    const handleValidation = () => {
        const errors = validate(formData);
        console.log(errors);
        setValidErrors(errors);
        return Object.keys(errors).length === 0;
    }

    return {
        formData,
        validErrors,
        handleChange,
        handleValidation
    };
};
export default useFormValidation;