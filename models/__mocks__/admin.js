const TODAY = (new Date()).getTime();
const DAY_OFFSET = 1 * 24 * 60 * 60 * 1000;
const mockAdmin = {
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
};

async function getOneByEmail(email) {
    let rows = mockAdmin.filter((v) => {
        return v.email === email
    })
    return rows[0] || null;
}

async function getOneByEmailAndPwd(email, password) {
    let rows = mockAdmin.filter((v) => {
        return v.email === email && password === "123456";
    })
    return rows[0] || null;
}

async function createOneWithToken(admin) {
    return 101;
}

async function getOne(id) {
    let rows = mockAdmin.filter((v) => {
        return v.email === id;
    })
    return rows[0] || null;
}

async function getOneByEmailAndAnswer(email, answer) {
    let rows = mockAdmin.filter((v) => {
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

async function updateOne(newAdmin) {
    return 1;
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
    updateOne
}