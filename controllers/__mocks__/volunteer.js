import httpResp from "../../helpers/httpResp.js";

async function login(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function register(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function verify(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getQuestion(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function forget(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function updatePassword(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function updateQuestionAndAnswer(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getProfile(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function updateProfile(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getAll(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getOne(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getAllAssignedByEventId(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getAllMatchedByEventId(req, res) {
    return httpResp.Success[200](req, res, {});
}

export default {
    ...jest.requireActual("../volunteer.js").default,
    login,
    register,
    verify,
    getQuestion,
    forget,
    updatePassword,
    updateQuestionAndAnswer,
    getProfile,
    updateProfile,
    getAll,
    getOne,
    getAllAssignedByEventId,
    getAllMatchedByEventId
}