import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";

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

async function assignVolunteer(eventId, volunteerId) {
    let data = utils.objectAssign(['event_id', 'volunteer_id'], { 
        event_id: eventId,
        volunteer_id: volunteerId
    });
    validator.validate(data);
    // assign
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