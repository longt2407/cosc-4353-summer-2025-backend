import eventModel from "../models/event.js";
import volunteerEventmodel from "../models/volunteerEvent.js";
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
    await volunteerEventmodel.assignVolunteer(eventId, volunteerId);
    //let assignVolunteer = await volunteerEventmodel.getOnevolunteerEventassign(volunteerEventassignId);
    return httpResp.Success[200](req, res, null);
}

export default {
    getAllByAdminId,
    createOne,
    updateOne,
    deleteOne,
    assignVolunteer
}