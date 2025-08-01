import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import { HttpError } from "../helpers/error.js";

const validator = new Validator({
    id: [DataType.NUMBER(), DataType.NOTNULL()],
    event_id: [DataType.NUMBER(), DataType.NOTNULL()],
    volunteer_id: [DataType.NUMBER(), DataType.NOTNULL()],
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

const mockVolunteerEvent = {
    id: 1,
    volunteer_id: 1,
    event_id: 1,
    status: 0,
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    eleted_at: new Date()
};

async function assignVolunteer(conn, eventId, volunteerId, adminId) {
    let data = utils.objectAssign(['event_id', 'volunteer_id', 'admin_id'], { eventId, volunteerId, adminId});
    validator.validate(data);
    let event = await getOne(conn, data.event_id);
    if (!event){
        throw new HttpError({ statusCode: 400, message: "Event not found." })
    }
    if (event.admin_id != data.admin_id){
        throw new HttpError({statusCode: 401});
    }
    // check if the volunteer is already assigned to event
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
    let sql_3 = "INSERT INTO notification (volunteer_id, title, message) VALUES (?, ?, ?)";
    let params_3 = [data.volunteer_id, "Assigned", `You have been assigned to the event: ${event.name}`];
    await conn.query(sql_3, params_3);
    return 1;
}

async function dropVolunteer(eventId, volunteerId) {
    let data = utils.objectAssign(['event_id', 'volunteer_id'], { 
        event_id: eventId,
        volunteer_id: volunteerId
    });
    validator.validate(data);
    // drop
    return 1;
}

export default {
    validator,
    assignVolunteer,
    dropVolunteer
}