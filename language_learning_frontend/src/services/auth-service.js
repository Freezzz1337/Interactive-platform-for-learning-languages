import {_api, _requestOptionsPost} from "./api";

const register = (formData) => {
    return fetch(`${_api}auth/signup`, _requestOptionsPost(formData))
        .then(response => response.json());
}

export {
    register
}