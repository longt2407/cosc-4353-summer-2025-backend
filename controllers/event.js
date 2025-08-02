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
        let adminId = req.jwt.user.id
        let [eventId] = utils.parseStr(req.params.id);
        await eventModel.deleteOne(conn, eventId, adminId);
        return null;
    });
}

async function assignVolunteer(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteerId = body.volunteer_id;
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        await volunteerEventModel.assignVolunteer(conn, eventId, volunteerId, adminId);
        return null;
    }); 
}

async function dropVolunteer(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteerId = body.volunteer_id;
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        await volunteerEventModel.dropVolunteer(conn, eventId, volunteerId, adminId);
        return null;
    }); 
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

async function updateParticipatedStatus(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteerId = body.volunteer_id;
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        await volunteerEventModel.updateParticipatedStatus(conn, eventId, volunteerId, adminId);
        return null;
    });
}

async function updateNoShowStatus(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteerId = body.volunteer_id;
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        await volunteerEventModel.updateNoShowStatus(conn, eventId, volunteerId, adminId);
        return null;
    });
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