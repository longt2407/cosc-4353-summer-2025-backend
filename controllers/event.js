import eventModel from "../models/event.js";
import httpResp from "../helpers/httpResp.js";
import { HttpError }  from "../helpers/error.js";

async function createOne(req, res) {
    let body = req.body;
    body.admin_id = req.jwt.user.id;
    let eventId = await eventModel.createOne(body);
    let event = await eventModel.getOne(eventId, { include: true })
    return httpResp.Success[200](req, res, event);
}

export default {
    createOne
}