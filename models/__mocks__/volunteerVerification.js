const mockVolunteerVerification = [{
    id: 1,
    email: "volunteer101@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu", // 2
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYwMDgxNTMsImRhdGEiOnsiZW1haWwiOiJ2b2x1bnRlZXIxMDFAZG9tYWluLmNvbSJ9LCJpYXQiOjE3NTM0MTYxNTN9.QjsrvVz4ACHOcI8OV4dH-hZTOvcghLDeK7GjqKQlzi8",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}, {
    id: 2,
    email: "volunteer102@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu", // 2
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYwMDg1MDIsImRhdGEiOnsiZW1haWwiOiJ2b2x1bnRlZXIxMDJAZG9tYWluLmNvbSJ9LCJpYXQiOjE3NTM0MTY1MDJ9.yg08tqc2rOCo4QVCG3laiR_NlUWLH0vPHEAWIroYadM",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}];

async function getOneByEmail(email) {
    let rows = mockVolunteerVerification.filter((vv) => {
        return vv.email === email;
    });
    return rows[0] || null;
}

async function getOneByToken(token) {
    let rows = mockVolunteerVerification.filter((vv) => {
        return vv.token === token;
    });
    return rows[0] || null;
}

async function createOne(volunteer) {
    // volunteer201@domain.com
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYwMDg2MTksImRhdGEiOnsiZW1haWwiOiJ2b2x1bnRlZXIyMDFAZG9tYWluLmNvbSJ9LCJpYXQiOjE3NTM0MTY2MTl9.N4bgZUFc_RINSPbFB04fcANBNCF0t4fvinD4TUHDo5g";
}

export default {
    ...jest.requireActual("../volunteerVerification.js").default,
    getOneByEmail,
    getOneByToken,
    createOne
}