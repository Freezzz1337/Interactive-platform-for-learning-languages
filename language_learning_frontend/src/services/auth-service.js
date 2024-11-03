import {_api, _requestOptionsPost} from "./api";

const register = (formData) => {
    return fetch(`${_api}auth/signup`, _requestOptionsPost(formData))
        .then(response => response.json());
}

const authenticate = (formData) => {
    return fetch(`${_api}auth/login`, _requestOptionsPost(formData))
        .then(response => response.json());
}

export {
    register,
    authenticate
}