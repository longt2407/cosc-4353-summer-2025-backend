import httpResp from "../../helpers/httpResp.js";

async function getAllByAdminId(req, res){
    return httpResp.Success[200](req, res, {});
}

async function createOne(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function updateOne(req,res) {
    return httpResp.Success[200](req, res, {});
}

async function deleteOne(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function assignVolunteer(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function dropVolunteer(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function getOneByAdminId(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function updateParticipatedStatus(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function updateNoShowStatus(req, res) {
    return httpResp.Success[200](req, res, {});
}

export default {
    getAllByAdminId,
    createOne,
    updateOne,
    deleteOne,
    assignVolunteer,
    dropVolunteer,
    getOneByAdminId,
    updateParticipatedStatus,
    updateNoShowStatus
}