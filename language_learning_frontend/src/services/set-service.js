import {_api, _requestOptionsGET, _requestOptionsPost} from "./api";

const createSet = (formData, token) => {
    return fetch(`${_api}set/create`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

const getSet = (id, token) => {
    return fetch(`${_api}set/${id}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getSets = (page, size, token) => {
    return fetch(`${_api}set/get?page=${page}&size=${size}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getSetsByFolder = (folderId, page, size, token) => {
    return fetch(`${_api}set/getAllByFolder/${folderId}?page=${page}&size=${size}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const getSetsByFolderNotInFolder = (folderId, page, size, token) => {
    return fetch(`${_api}set/getAllNotInFolder/${folderId}?page=${page}&size=${size}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const addSetsToFolder = (formData, token) => {
    return fetch(`${_api}set/addSetsToFolder`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

export {
    createSet,
    getSet,
    getSets,
    getSetsByFolder,
    getSetsByFolderNotInFolder,
    addSetsToFolder,
}