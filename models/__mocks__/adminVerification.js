const mockAdminVerification = [{
    id: 1,
    email: "admin101@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}, {
    id:2,
    email: "admin102@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzM4MjAsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODE4MjB9.4fQbSWYe8E66b9RTCbXLyxjTU0Fc9gnobmBlmNZHwb8",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}]

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
    // admin201@domain.com
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYzMzcxOTUsImRhdGEiOnsiZW1haWwiOiJhZG1pbjIwMUBkb21haW4uY29tIn0sImlhdCI6MTc1Mzc0NTE5NX0.tXkIdEdwxqM_gjFBjTXdZLzBI4r25UMrgH4CQSlC_Ws";
}

export default {
    ...jest.requireActual("../adminVerification.js").default,
    getOneByEmail,
    getOneByToken,
    createOne
}