const mockEvent = [{
    id: 1,
    admin_id: 1,
    admin: {
        id: 1,
        email: "admin1@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Admin 1",
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
    skill: ["communication","technology","leader"],
    urgency: 0,
    date: new Date(),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}, {
    id: 2,
    admin_id: 2,
    admin: {
        id: 2,
        email: "admin2@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Admin 2",
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
    skill: ["communication","technology"],
    urgency: 1,
    date: new Date(),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}];

async function getOne(conn, id) {
    let rows = mockEvent.filter((e) => {
        return e.id === id;
    })
    return rows[0] || null;
}

async function getAllByAdminId(conn, admin_id){
    let rows = mockEvent.filter((e) => {
        return e.admin_id === admin_id;
    })
    return rows;
}

async function createOne(conn, event) {
    return 1;
}

async function updateOne(conn, newEvent) {
    return 1;
}

async function deleteOne(conn, id, admin_id) {
    return null;
}

async function getOneByAdminId(conn, id, admin_id) {
    let rows = mockEvent.filter((e) => {
        return e.id = id && e.admin_id === admin_id;
    })
    return rows[0] || null;
}

export default {
    ...jest.requireActual("../event.js").default,
    getOne,
    getAllByAdminId,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    getOneByAdminId
}