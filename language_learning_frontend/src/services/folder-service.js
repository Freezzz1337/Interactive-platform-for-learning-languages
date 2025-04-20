import {_api, _requestOptionsDELETE, _requestOptionsGET, _requestOptionsPATCH, _requestOptionsPost} from "./api";

const createFolder = (formData, token) => {
    return fetch(`${_api}folder/create`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

const getFolders = (page, size, token) => {
    return fetch(`${_api}folder/get?page=${page}&size=${size}`, _requestOptionsGET(token))
        .then(response => response.json());
}

const editFolderName = (formData, token) => {
    return fetch(`${_api}folder/editName`, _requestOptionsPATCH(formData, token))
        .then(response => response.json());
}

const deleteFolder = (folderId, token) => {
    return fetch(`${_api}folder/delete/${folderId}`, _requestOptionsDELETE(token))
        .then(response => response.json());
}

const deleteSetFromFolder = (folderId, setId, token) => {
    return fetch(`${_api}folder/deleteSetFromFolder?folderId=${folderId}&setId=${setId}`, _requestOptionsDELETE(token))
        .then(response => response.json());
}
export {
    createFolder,
    getFolders,
    editFolderName,
    deleteFolder,
    deleteSetFromFolder
}