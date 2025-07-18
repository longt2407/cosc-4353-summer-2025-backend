import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";

const validator = new Validator({
    id: [DataType.NUMBER(), DataType.NOTNULL()],
    admin_id: [DataType.NUMBER(), DataType.NOTNULL()],
    name: [DataType.STRING(), DataType.NOTNULL()],
    description: [DataType.STRING(), DataType.NOTNULL()], 
    location: [DataType.STRING(), DataType.NOTNULL()],
    skill: [DataType.ARRAY(DataType.STRING()), DataType.NOTNULL()],
    urgency: [
        DataType.NUMBER({
            check: (val) => {
                if (!(val in [0, 1, 2])) {
                    return { error: new Error("invalid") };
                }
            }
        }), 
        DataType.NOTNULL()
    ],
    date: [DataType.DATETIME()]
});

const mockEventA = {
    id: 1,
    admin_id: 1,
    admin: {
        id: 1,
        email: "admin@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Admin",
        middle_name: null,
        last_name: "Account",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    },
    name: "Event A",
    description: "Description of Event A",
    location: "Location A",
    skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
    urgency: 0,
    date: new Date(),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
};

const mockEventB = {
    id: 2,
    admin_id: 1,
    admin: {
        id: 1,
        email: "admin@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Admin",
        middle_name: null,
        last_name: "Account",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    },
    name: "Event B",
    description: "Description of Event B",
    location: "Location B",
    skill: JSON.parse(JSON.stringify(["communication","technology"])),
    urgency: 1,
    date: new Date(),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
};

function prepare(rows) {
    const _prepare = (obj) => {
        if (obj) {
            if (obj.admin) {
                delete obj.admin.password;
                delete obj.admin.reset_password_answer;
                obj.admin.role = auth.ADMIN;
            }
        }
    }
    if (!Array.isArray(rows)) {
        _prepare(rows);
    } else {
        for (let row of rows) {
            _prepare(row);
        }
    }
}

async function createOne(event) {
    let data = utils.objectAssign([
        "admin_id", 
        "name",
        "description",
        "location",
        "skill",
        "urgency",
        "date"
    ], event);
    validator.validate(data);
    // create event
    let eventId = 1;
    return eventId;
}

async function getAllByAdminId(admin_id){
    let data = utils.objectAssign(["admin_id"], { admin_id });
    validator.validate(data);
    // get events
    return [mockEventA, mockEventB];
}

async function getOne(id) {
    let data = utils.objectAssign(["id"], { id });
    validator.validate(data);
    // get event
    return mockEventA;
}

async function updateOne(id, newEvent) {
    let data = utils.objectAssign(["id"], { id });
    validator.validate(data);
    let oldEvent = await getOne(id);
    if (!oldEvent) {
        throw new HttpError({statusCode: 400, message: `Event not found.`});
    }
    data = utils.objectAssign([
        "admin_id",
        "name",
        "description",
        "location",
        "skill",
        "urgency",
        "date"
    ], oldEvent, newEvent);
    validator.validate(data);
    // update
    return 1;
}

async function deleteOne(id) {
    let data = utils.objectAssign(["id"], { id });
    validator.validate(data);
    // delete
    return 1;
}

async function getOneByAdminId(id, admin_id) {
    let data = utils.objectAssign(["id", "admin_id"], { id, admin_id });
    validator.validate(data);
    // get event
    return mockEventA;
}

export default {
    validator,
    prepare,
    createOne,
    getAllByAdminId,
    getOne,
    updateOne,
    deleteOne,
    getOneByAdminId
}