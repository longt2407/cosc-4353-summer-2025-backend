const TODAY = (new Date()).getTime();
const DAY_OFFSET = 1 * 24 * 60 * 60 * 1000;
const mockVolunteer = [{
    id: 1,
    email: "volunteer1@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu", // 2
    first_name: "Peter",
    middle_name: null,
    last_name: "Parker",
    address_1: "123 Street Dr",
    address_2: null,
    address_city: "Houston",
    address_state: "TX",
    address_zip: "70000",
    skill: ["communication", "technology", "leader"],
    preference: null,
    availability: [
        "2025-07-31T07:11:19.409Z", 
        "2025-08-01T07:11:19.409Z", 
        "2025-08-02T07:11:19.409Z" 
    ],
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}, {
    id: 2,
    email: "volunteer2@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu", // 2
    first_name: "John",
    middle_name: null,
    last_name: "Cena",
    address_1: "456 Street Dr",
    address_2: null,
    address_city: "Austin",
    address_state: "WA",
    address_zip: "90000",
    skill: ["strong", "technology"],
    preference: null,
    availability: [ 
        "2025-08-02T07:12:29.714Z", 
        "2025-08-03T07:12:29.714Z", 
        "2025-08-04T07:12:29.714Z" 
    ],
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}];

async function getOneByEmail(conn, email) {
    let rows = mockVolunteer.filter((v) => {
        return v.email === email
    })
    return rows[0] || null;
}

async function getOneByEmailAndPwd(conn, email, password) {
    let rows = mockVolunteer.filter((v) => {
        return v.email === email && password === "123456";
    })
    return rows[0] || null;
}

async function createOneWithToken(conn, volunteer) {
    return 101;
}

async function getOne(conn, id) {
    let rows = mockVolunteer.filter((v) => {
        return v.email === id;
    })
    return rows[0] || null;
}

async function getOneByEmailAndAnswer(conn, email, answer) {
    let rows = mockVolunteer.filter((v) => {
        return v.email === email && answer === "2";
    })
    return rows[0] || null;
}

async function updatePassword(conn, id, password) {
    return 1;
}

async function updateQuestionAndAnswer(conn, id, reset_password_question, reset_password_answer) {
    return 1;
}

async function updateOne(conn, newVolunteer) {
    return 1;
}

async function getAll(conn) {
    return mockVolunteer;
}

async function getAllAssignedByEventId(conn, event_id) {
    return [{
        ...mockVolunteer[0],
        status: 0
    }, {
        ...mockVolunteer[1],
        status: 1
    }, {
        ...mockVolunteer[1],
        id: 100,
        status: 2
    }];
}

async function getReportData(conn) {
    return mockVolunteer;
}

export default {
    ...jest.requireActual("../volunteer.js").default,
    getOneByEmail,
    getOneByEmailAndPwd,
    createOneWithToken,
    getOne,
    getOneByEmailAndAnswer,
    updatePassword,
    updateQuestionAndAnswer,
    updateOne,
    getAll,
    getAllAssignedByEventId,
    getReportData
}