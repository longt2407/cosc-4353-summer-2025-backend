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

async function updateOne(req,res) {
    let body = req.body;
    let eventId = req.params.id;
    body.admin_id = req.jwt.user.id;
    let updatedEvent = await eventModel.updateOne(eventId, body)
    eventModel.prepare(updatedEvent);
    return httpResp.Success[200](req, res, updatedEvent);
}

async function deleteOne(req, res) {
    let eventId = req.params.id;
    await eventModel.deleteOne(eventId);
    //return null;
    return httpResp.Success[200](req, res, { message: "Event deleted." });

}

export default {
    getAllByAdminId,
    createOne,
    updateOne,
    deleteOne
}