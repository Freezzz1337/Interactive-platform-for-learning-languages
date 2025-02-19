import {_api, _requestOptionsGET, _requestOptionsPost} from "./api";

const createSet = (formData, token) => {
    return fetch(`${_api}set/create`, _requestOptionsPost(formData, token))
        .then(response => response.json());
}

const getSet = (id, token) => {
    return fetch(`${_api}set/${id}`, _requestOptionsGET(token))
        .then(response => response.json());
}

export {
    createSet,
    getSet
}