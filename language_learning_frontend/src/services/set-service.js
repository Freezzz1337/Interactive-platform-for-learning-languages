import {_api, _requestOptionsPost} from "./api";
const createSet = (formData, token) => {
    return fetch(`${_api}set/create`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

export {
    createSet
}