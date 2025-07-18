import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";

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
    // validate data
    // create event
    let eventId = 1;
    return eventId;
}

async function getAllByAdminId(admin_id){
    let data = utils.objectAssign(["admin_id"], { admin_id });
    // validate data
    // get events
    return [{
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
        descriotion: "Description of Event A",
        location: "Location A",
        skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
        urgency: 0,
        date: new Date(),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    },{
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
        descriotion: "Description of Event B",
        location: "Location B",
        skill: JSON.parse(JSON.stringify(["communication","technology"])),
        urgency: 1,
        date: new Date(),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
        
    }];
}

async function getOne(id) {
    let data = utils.objectAssign(["id"], { id });
    // validate data
    // get event
    return {
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
        descriotion: "Description of Event A",
        location: "Location A",
        skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
        urgency: 0,
        date: new Date(),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    };
}

async function updateOne(id, newEvent) {
    let data = utils.objectAssign(["id"], { id });
    // validate data
    // update event
    data = utils.objectAssign([
        "admin_id",
        "name",
        "description",
        "location",
        "skill",
        "urgency",
        "date"
    ], data, newEvent);
    let newEvents = [{
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
        name: "Event A after Update",
        descriotion: "Description of Event A",
        location: "Location A",
        skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
        urgency: 0,
        date: new Date(),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    },{
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
        name: "Event B after Update",
        descriotion: "Description of Event B",
        location: "Location B after update",
        skill: JSON.parse(JSON.stringify(["communication","technology"])),
        urgency: 1,
        date: new Date(),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
        
    }];
    return newEvents.find(event => event.id === parseInt(id, 10));
}

async function deleteOne(id) {
    let data = utils.objectAssign(["id"], { id });
    // validate data
    return true;
}

export default {
    prepare,
    createOne,
    getAllByAdminId,
    getOne,
    updateOne,
    deleteOne
}