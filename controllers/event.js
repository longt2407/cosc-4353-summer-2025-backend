import eventModel from "../models/event.js";
import volunteerEventModel from "../models/volunteerEvent.js";
import httpResp from "../helpers/httpResp.js";
import utils from "../helpers/utils.js";
import db from "./db.js";

async function getAllByAdminId(req, res){
    await db.tx(req, res, async (conn) => {
        let adminId = req.jwt.user.id
        let data = await eventModel.getAllByAdminId(conn, adminId);
        eventModel.prepare(data);
        return data;
    });
}

async function createOne(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.admin_id = req.jwt.user.id;
        let eventId = await eventModel.createOne(conn, body);
        let data = await eventModel.getOne(conn, eventId)
        eventModel.prepare(data);
        return data;
    });
}

async function updateOne(req,res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.admin_id = req.jwt.user.id;
        [body.id] = utils.parseStr(req.params.id); 
        let eventId = await eventModel.updateOne(conn, body);
        let data = await eventModel.getOne(conn, eventId);
        eventModel.prepare(data);
        return data;
    });
}

async function deleteOne(req, res) {
    await db.tx(req, res, async (conn) => {
        let eventId = utils.parseStr(req.params.id);
        await eventModel.deleteOne(conn, eventId);
        return null;
    });
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

async function getOneByAdminId(req, res) {
    await db.tx(req, res, async (conn) => {
        let adminId = req.jwt.user.id
        let [eventId] = utils.parseStr(req.params.id);
        let data = await eventModel.getOneByAdminId(conn, eventId, adminId);
        eventModel.prepare(data);
        return data;
    });
}

export default {
    getAllByAdminId,
    createOne,
    updateOne,
    deleteOne,
    assignVolunteer,
    dropVolunteer,
    getOneByAdminId
}