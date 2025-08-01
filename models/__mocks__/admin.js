const mockAdmin = [{
    id: 1,
    email: "admin1@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    first_name: "Admin1",
    middle_name: null,
    last_name: "Account1",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
},{
    id: 2,
    email: "admin2@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    first_name: "Admin2",
    middle_name: null,
    last_name: "Account2",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}];

async function getOneByEmail(conn, email) {
    let rows = mockAdmin.filter((v) => {
        return v.email === email
    })
    return rows[0] || null;
}

async function getOneByEmailAndPwd(conn, email, password) {
    let rows = mockAdmin.filter((v) => {
        return v.email === email && password === "123456";
    })
    return rows[0] || null;
}

async function createOneWithToken(conn, admin) {
    return 101;
}

async function getOne(conn, id) {
    let rows = mockAdmin.filter((v) => {
        return v.email === id;
    })
    return rows[0] || null;
}

async function getOneByEmailAndAnswer(conn, email, answer) {
    let rows = mockAdmin.filter((v) => {
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

async function updateOne(conn, newAdmin) {
    return 1;
}

async function getAll(conn) {
    return mockAdmin;
}

export default {
    ...jest.requireActual("../admin.js").default,
    getOneByEmail,
    getOneByEmailAndPwd,
    createOneWithToken,
    getOne,
    getOneByEmailAndAnswer,
    updatePassword,
    updateQuestionAndAnswer,
    updateOne,
    getAll
}