import {getNotifByVolunteerId, markAsRead, createNotif, deleteNotif, getUnreadCountByVolunteerId} from "../models/notification.js";
import httpResp from "../helpers/httpResp.js";
import db from "../controllers/db.js";

const {Success, Error} = httpResp;

const isAuthorized = (req, volunteerID) => {
    const loggedUserId = req.jwt?.user?.id;
    const role = req.jwt?.user?.role;
    const targetVolunteerId = parseInt(req.params.id, 10); // read from req.params

    return role === 1 || loggedUserId === targetVolunteerId;
};

//GET
export const getAllNotifs = async (req, res) => {
    //console.log("req.jwt: ", req.jwt);
    if (!isAuthorized(req)) {
        //console.log('Unauthorized triggered');
        return Error[401](req, res, new Error("Unauthorized access."));
    }

    const volunteerID = parseInt(req.params.id); // still needed for the DB query
    const notifs = await getNotifByVolunteerId(volunteerID);
    return Success[200](req, res, notifs);
};

//GET for unread count
export const getUnreadNotifs = async (req, res) => {
    const volunteerID = parseInt(req.params.volunteer_id);
    if (!volunteerID) return httpResp.Error[400](req, res, new Error("Invalid volunteer_id"));

    try {
        const count = await getUnreadCountByVolunteerId(volunteerID);
        httpResp.Success[200](req, res, { unreadCount: count });
    } catch (err) {
        httpResp.Error.default(req, res, err);
    }
};

//PUT
export const markAsReadNotif = async (req, res) => {
    const notifID = parseInt(req.params.nid, 10);
    if (isNaN(notifID)) {
        return Error[400](req, res, new Error("Invalid notification ID"));
    }
    const loggedUser = req.jwt?.user;

    const notifUpdate = markAsRead(notifID, loggedUser.id);
    if(!notifUpdate) {
        return Error[404](req, res, new Error("Notification not found"));
    }

    return Success[200](req, res, notifUpdate);
};

//DELETE
export const deleteNotifById = async (req, res) => {
    const notifID = parseInt(req.params.nid, 10);
    if (isNaN(notifID)) {
        return Error[400](req, res, new Error("Invalid notification ID"));
    }
    const loggedUser = req.jwt?.user;

    const notifRemoved = await deleteNotif(notifID);

    if(!notifRemoved) {
        return Error[400](req, res, new Error("Notification not found"));
    }

    if(loggedUser.role !==1 && notifRemoved.volunteer_id !== loggedUser.id) {
        return Error[400](req, res, new Error("Unauthorized to delete this notification"));
    }

    return Success[200](req, res, notifRemoved);
};

//POST
export const createNewNotif = async (req, res) => {
    const {volunteer_id, type, title, message} = req.body;
    const loggedUser = req.jwt?.user;

    if(loggedUser.role === 0 && loggedUser.id !== volunteer_id) {
        return Error.default(req, res, new Error("Only the user can create their own notification."));
    }

    if(volunteer_id === undefined || type === undefined || !title || !message) {
        return Error[400](req, res, new Error("Missing required fields"));
    }

    const newNotif = await createNotif({volunteer_id, type, title, message});
    return Success[200](req, res, newNotif);
};
