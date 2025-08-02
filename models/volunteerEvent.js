import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import { HttpError } from "../helpers/error.js";
import eventModel from "../models/event.js";

const validator = new Validator({
    id: [DataType.NUMBER(), DataType.NOTNULL()],
    event_id: [DataType.NUMBER(), DataType.NOTNULL()],
    volunteer_id: [DataType.NUMBER(), DataType.NOTNULL()],
    admin_id: [DataType.NUMBER(), DataType.NOTNULL()],
    status: [
        DataType.NUMBER({
            check: (val) => {
                if (!(val in [0, 1, 2])) {
                    return { error: new Error("invalid") };
                }
            }
        }), 
        DataType.NOTNULL()
    ]
});

async function assignVolunteer(conn, eventId, volunteerId, adminId) { 
    let data = utils.objectAssign(['event_id', 'volunteer_id', 'admin_id'], { 
        event_id: eventId, 
        volunteer_id: volunteerId, 
        admin_id: adminId
    });
    validator.validate(data);
    let event = await eventModel.getOne(conn, data.event_id);
    if (!event){
        throw new HttpError({ statusCode: 400, message: "Event not found." })
    }
    if (event.admin_id != data.admin_id){
        throw new HttpError({ statusCode: 401 });
    }
    // make sure the volunteer is not assigned to event
    let sql_1 = "SELECT * FROM volunteer_event WHERE volunteer_id = ? AND event_id = ? AND is_deleted = ?";
    let params_1 = [data.volunteer_id, data.event_id, false];
    const [rows] = await conn.query(sql_1, params_1);
    if (rows[0]){
        throw new HttpError({ statusCode: 400, message: "Volunteer is already assigned to event." })
    }
    // assign
    let sql_2 = "INSERT INTO volunteer_event (volunteer_id, event_id, status) VALUES (?, ?, ?)";
    let params_2 = [data.volunteer_id, data.event_id, 0];
    await conn.query(sql_2, params_2);
    // notification
    let sql_3 = "INSERT INTO notification (volunteer_id, type, title, message) VALUES (?, ?, ?, ?)";
    let params_3 = [
        data.volunteer_id, 
        0,
        `[ASSIGNED] ${event.name}`, 
        `You are assigned to the event: ${event.name}. Please check your history for more detail.`
    ];
    await conn.query(sql_3, params_3);
    return null;
}

async function dropVolunteer(conn, eventId, volunteerId, adminId) {
    let data = utils.objectAssign(['event_id', 'volunteer_id', 'admin_id'], { 
        event_id: eventId, 
        volunteer_id: volunteerId, 
        admin_id: adminId
    });
    validator.validate(data);
    let event = await eventModel.getOne(conn, data.event_id);
    if (!event){
        throw new HttpError({ statusCode: 400, message: "Event not found." })
    }
    if (event.admin_id != data.admin_id){
        throw new HttpError({statusCode: 401});
    }
    // make sure the volunteer is assigned to event
    let sql_1 = "SELECT * FROM volunteer_event WHERE volunteer_id = ? AND event_id = ? AND is_deleted = ?";
    let params_1 = [data.volunteer_id, data.event_id, false];
    const [rows] = await conn.query(sql_1, params_1);
    if (!rows[0]){
        throw new HttpError({ statusCode: 400, message: "Volunteer is not assigned to event." })
    }
    // drop
    let sql_2 = "DELETE FROM volunteer_event WHERE volunteer_id = ? AND event_id = ?";
    let params_2 = [data.volunteer_id, data.event_id];
    await conn.query(sql_2, params_2);
    // notification
    let sql_3 = "INSERT INTO notification (volunteer_id, type, title, message) VALUES (?, ?, ?, ?)";
    let params_3 = [
        data.volunteer_id, 
        0,
        `[DROPPED] ${event.name}`, 
        `You are removed from the event: ${event.name}. Please contact admin (${event.admin.email}) for more detail.`
    ];
    await conn.query(sql_3, params_3);
    return null;
}

export default {
    validator,
    assignVolunteer,
    dropVolunteer
}