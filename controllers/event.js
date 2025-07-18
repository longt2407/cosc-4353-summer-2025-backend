import eventModel from "../models/event.js";
import httpResp from "../helpers/httpResp.js";

async function getAllByAdminId(req, res){
    let adminId = req.jwt.user.id;
    let events = await eventModel.getAllByAdminId(adminId);
    eventModel.prepare(events);
    return httpResp.Success[200](req, res, events);
}

async function createOne(req, res) {
    let body = req.body;
    body.admin_id = req.jwt.user.id;
    let eventId = await eventModel.createOne(body);
    let event = await eventModel.getOne(eventId)
    eventModel.prepare(event);
    return httpResp.Success[200](req, res, event);
}

export default {
    getAllByAdminId,
    createOne
}