import {useState} from "react";
import {convertFileToBase64} from "../util/convert-file-to-base64";

const useFormValidation = (initialState, validate) => {
    const [formData, setFormData] = useState(initialState);
    const [validErrors, setValidErrors] = useState({});

    const handleChange = (e) => {
        const {type, name, dataset, value, checked} = e.target;

        if (type === "checkbox") {
            setFormData({...formData, [name] : !checked});
        } else if (dataset.type === "word") {
            const index = Number(dataset.index);
            setFormData((prevData) => {
                const updatedWords = [...(prevData.words || [])];
                updatedWords[index] = {
                    ...updatedWords[index],
                    [name]: value,
                };
                return {...prevData, words: updatedWords};
            });
        } else if (type === "file") {
            convertFileToBase64(e.target.files[0], (base64String) => {
                setFormData({...formData, [name]: base64String});
            });
        } else {
            setFormData({...formData, [name]: value});
        }
    }

    const handleValidation = () => {
        const errors = validate(formData);
        if (!errors) {
            return true ;
        }
        setValidErrors(errors);
        return Object.keys(errors).length === 0;
    }

    return {
        formData,
        setFormData,
        validErrors,
        handleChange,
        handleValidation,
    };
};
export default useFormValidation;