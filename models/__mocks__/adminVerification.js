const mockAdminVerification = {
    id: 1,
    email: "admin@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTU0MDg3MTgsImRhdGEiOnsiZW1haWwiOiJhZG1pbkBkb21haW4uY29tIn0sImlhdCI6MTc1MjgxNjcxOH0.nzjgtvGy7azvK3g_IwHGrc0pRn4IDyF8PEqm2SOpmsU",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}

async function getOneByEmail(email) {
    let rows = mockAdminVerification.filter((vv) => {
        return vv.email === email;
    });
    return rows[0] || null;
}

async function getOneByToken(token) {
    let rows = mockAdminVerification.filter((vv) => {
        return vv.token === token;
    });
    return rows[0] || null;
}

async function createOne(admin) {
    // admin1@domain.com
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzE1ODgsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2Nzk1ODh9.G0bCo1QQOFwjXTCRNdmRcUO5aPiZjnkC7cgNAZYHBZs";
}

export default {
    ...jest.requireActual("../adminVerification.js").default,
    getOneByEmail,
    getOneByToken,
    createOne
}