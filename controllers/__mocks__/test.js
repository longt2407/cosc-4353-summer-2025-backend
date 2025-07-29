import httpResp from "../../helpers/httpResp.js";

function echoGet(req, res) {
    httpResp.Success[200](req, res, {});
}

function echoPost(req, res) {
    return httpResp.Success[200](req, res, {});
}

function echoPatch(req, res) {
    return httpResp.Success[200](req, res, {});
}

function echoDelete(req, res) {
    return httpResp.Success[200](req, res, {});
}

function auth(req, res) {
    return httpResp.Success[200](req, res, {});
}

export default {
    ...jest.requireActual("../test.js").default,
    echoGet,
    echoPost,
    echoPatch,
    echoDelete,
    auth
}