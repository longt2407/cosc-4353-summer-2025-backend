const TODAY = (new Date()).getTime();
const DAY_OFFSET = 1 * 24 * 60 * 60 * 1000;
const mockVolunteers = [{
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
    address_city: "Earth",
    address_state: "TX",
    address_zip: "70000",
    skill: JSON.parse(JSON.stringify(["communication", "technology", "leader"])),
    preference: null,
    availability: JSON.parse(JSON.stringify([TODAY - DAY_OFFSET, TODAY, TODAY + DAY_OFFSET])),
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
    address_city: "Moon",
    address_state: "WA",
    address_zip: "90000",
    skill: JSON.parse(JSON.stringify(["strong", "technology"])),
    preference: null,
    availability: JSON.parse(JSON.stringify([TODAY + DAY_OFFSET, TODAY + 2 * DAY_OFFSET, TODAY + 2 * DAY_OFFSET])),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}];

async function getOneByEmail(email) {
    let rows = mockVolunteers.filter((v) => {
        return v.email === email
    })
    return rows[0] || null;
}

async function getOneByEmailAndPwd(email, password) {
    let rows = mockVolunteers.filter((v) => {
        return v.email === email && password === "123456";
    })
    return rows[0] || null;
}

async function createOneWithToken(volunteer) {
    return 101;
}

async function getOne(id) {
    let rows = mockVolunteers.filter((v) => {
        return v.email === id;
    })
    return rows[0] || null;
}

async function getOneByEmailAndAnswer(email, answer) {
    let rows = mockVolunteers.filter((v) => {
        return v.email === email && answer === "2";
    })
    return rows[0] || null;
}

async function updatePassword(id, password) {
    return 1;
}

async function updateQuestionAndAnswer(id, reset_password_question, reset_password_answer) {
    return 1;
}

async function updateOne(newVolunteer) {
    return 1;
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
    updateOne
}