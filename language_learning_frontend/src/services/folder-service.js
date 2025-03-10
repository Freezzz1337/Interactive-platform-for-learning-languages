import {_api, _requestOptionsGET, _requestOptionsPost} from "./api";

const createFolder = (formData, token) => {
    return fetch(`${_api}folder/create`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

const getFolders = (page, size, token) => {
    return fetch(`${_api}folder/get?page=${page}&size=${size}`, _requestOptionsGET(token))
        .then(response => response.json());
}

export {
    createFolder,
    getFolders,
}