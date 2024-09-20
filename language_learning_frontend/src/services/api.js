const _api = "http://localhost:8080/";

const _requestOptionsPost = (formData, token = "") => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    return {
        method: "POST",
        headers: myHeaders,
        body: formData
    }
}

export {
    _api,
    _requestOptionsPost
}