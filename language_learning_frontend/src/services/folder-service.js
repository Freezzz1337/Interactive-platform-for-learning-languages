import {_api, _requestOptionsPost} from "./api";

const createFolder = (formData, token) => {
    return fetch(`${_api}folder/create`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

export {
    createFolder
}