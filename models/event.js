import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import adminModel from "./admin.js";
import { HttpError } from "../helpers/error.js";
import moment from "moment";

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
    date: [DataType.DATETIME(), DataType.NOTNULL()]
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
                adminModel.prepare(obj.admin);
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

async function include(conn, rows) {
    const _include = async (obj) => {
        if (obj) {
            if (obj.admin_id) {
                obj.admin = await adminModel.getOne(conn, obj.admin_id);
            }
        }
    }
    if (!Array.isArray(rows)) {
        await _include(rows);
    } else {
        for (let row of rows) {
            await _include(row);
        }
    }
}

function parse(rows) {
    const _parse = (obj) => {
        if (obj) {
            if (obj.skill) {
                obj.skill = JSON.parse(obj.skill);
            }
        }
    }
    if (!Array.isArray(rows)) {
        _parse(rows);
    } else {
        for (let row of rows) {
            _parse(row);
        }
    }
}

function stringify(rows) {
    const _stringify = (obj) => {
        if (obj) {
            if (obj.skill) {
                obj.skill = JSON.stringify(obj.skill);
            }
        }
    }
    if (!Array.isArray(rows)) {
        _stringify(rows);
    } else {
        for (let row of rows) {
            _stringify(row);
        }
    }
}

async function getAllByAdminId(conn, admin_id){
    let data = utils.objectAssign(["admin_id"], { admin_id });
    validator.validate(data);
    // get events
    let sql = "SELECT * FROM event WHERE admin_id = ? AND is_deleted = ?";
    let params = [data.admin_id, false];
    const [rows] = await conn.query(sql, params);
    await include(conn, rows);
    parse(rows);
    return rows;
}

async function getOne(conn, id) {
    let data = utils.objectAssign(["id"], { id });
    validator.validate(data);
    // get event
    let sql = "SELECT * FROM event WHERE id = ? AND is_deleted = ?";
    let params = [data.id, false];
    const [rows] = await conn.query(sql, params);
    if (rows[0]) {
        await include(conn, rows);
        parse(rows);
    }
    return rows[0] || null;
}

async function createOne(conn, event) {
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
    data.date = new Date(data.date);
    let now = new Date();
    if (moment(data.date).isAfter(moment(now), "day")) {
        throw new HttpError({ statusCode: 400, message: "Cannot create event in the past." })
    }
    stringify(data);
    // create event
    let sql = "INSERT INTO event (admin_id, name, description, location, skill, urgency, date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let params = [data.admin_id, data.name, data.description, data.location, data.skill, data.urgency, data.date];
    const [rows] = await conn.query(sql, params);
    return rows.insertId;
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

async function getOneByAdminId(conn, id, admin_id) {
    let data = utils.objectAssign(["id", "admin_id"], { id, admin_id });
    validator.validate(data);
    // get event
    let sql = "SELECT * FROM event WHERE id = ? AND admin_id = ? AND is_deleted = ?";
    let params = [data.id, data.admin_id, false];
    let [rows] = await conn.query(sql, params);
    if (rows[0]) {
        await include(conn, rows);
        parse(rows);
    }
    return rows[0] || null;
}

export default {
    validator,
    prepare,
    getAllByAdminId,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getOneByAdminId
}