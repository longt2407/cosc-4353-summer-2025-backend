import eventModel from "../models/event.js";
import volunteerEventModel from "../models/volunteerEvent.js";
import httpResp from "../helpers/httpResp.js";
import utils from "../helpers/utils.js";

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
    let eventId = utils.parseStr(req.params.id);
    body.admin_id = req.jwt.user.id;
    eventId = await eventModel.updateOne(eventId, body)
    let event = await eventModel.getOne(eventId);
    eventModel.prepare(event);
    return httpResp.Success[200](req, res, event);
}

async function deleteOne(req, res) {
    let eventId = utils.parseStr(req.params.id);
    await eventModel.deleteOne(eventId);
    return httpResp.Success[200](req, res, null);
}

async function assignVolunteer(req, res) {
    let body = req.body;
    let volunteerId = body.volunteer_id;
    let eventId = utils.parseStr(req.params.id);
    let adminId = req.jwt.user.id;
    let event = await eventModel.getOneByAdminId(eventId, adminId);
    if (!event) {
        throw new HttpError({ statusCode: 400, message: "Event not found." })
    }
    await volunteerEventModel.assignVolunteer(eventId, volunteerId);
    return httpResp.Success[200](req, res, null);
}

async function dropVolunteer(req, res) {
    let body = req.body;
    let volunteerId = body.volunteer_id;
    let eventId = utils.parseStr(req.params.id);
    let adminId = req.jwt.user.id;
    let event = await eventModel.getOneByAdminId(eventId, adminId);
    if (!event) {
        throw new HttpError({ statusCode: 400, message: "Event not found." })
    }
    await volunteerEventModel.dropVolunteer(eventId, volunteerId);
    return httpResp.Success[200](req, res, null);
}

export default {
    getAllByAdminId,
    createOne,
    updateOne,
    deleteOne,
    assignVolunteer,
    dropVolunteer
}