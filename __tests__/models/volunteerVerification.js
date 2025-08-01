import volunteerModel from "../../models/volunteer.js";
import volunteerVerificationModel from "../../models/volunteerVerification.js";
jest.mock("../../helpers/jwt.js");

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

afterEach(() => {
    jest.restoreAllMocks();
});

// validator
test("volunteerVerificationModel.validate - error 1", async () => {
    let fn = () => {
        volunteerVerificationModel.validator.validate({
            email: "invalid email"
        });
    } 
    expect(fn).toThrow();
});

// getOneByEmail
test("volunteerVerificationModel.getOneByEmail 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockVolunteerVerification[0]]])
    };
    let email = "volunteer101@domain.com";
    let data = await volunteerVerificationModel.getOneByEmail(conn, email);
    expect(data).toEqual(mockVolunteerVerification[0]);
});

test("volunteerVerificationModel.getOneByEmail 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let email = "volunteer101@domain.com";
    let data = await volunteerVerificationModel.getOneByEmail(conn, email);
    expect(data).toBe(null);
});

// getOneByToken
test("volunteerVerificationModel.getOneByToken 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockVolunteerVerification[0]]])
    };
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78";
    let data = await volunteerVerificationModel.getOneByToken(conn, token);
    expect(data).toEqual(mockVolunteerVerification[0]);
});

test("volunteerVerificationModel.getOneByToken 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78";
    let data = await volunteerVerificationModel.getOneByToken(conn, token);
    expect(data).toBe(null);
});

// deleteOneByToken
test("volunteerVerificationModel.deleteOneByToken 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([null])
    };
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78";
    let data = await volunteerVerificationModel.deleteOneByToken(conn, token);
    expect(data).toBe(null);
});

// createOneWithToken
test("volunteerVerificationModel.createOneWithToken 1", async () => {
    jest.spyOn(volunteerModel, "getOneByEmail").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteerVerification[0]]]) // volunteerVerificationModel.getOneByEmail
            .mockResolvedValueOnce([[]])
    };
    let data = {
        email: "volunteer110@domain.com",
        password: "123456",
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "2",
    };
    let verifyToken = await volunteerVerificationModel.createOne(conn, data);
    expect(typeof verifyToken).toBe("string");
});

test("volunteerVerificationModel.createOneWithToken 2", async () => {
    jest.spyOn(volunteerModel, "getOneByEmail").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerVerificationModel.getOneByEmail
            .mockResolvedValueOnce([[]])
    };
    let data = {
        email: "volunteer110@domain.com",
        password: "123456",
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "2",
    };
    let verifyToken = await volunteerVerificationModel.createOne(conn, data);
    expect(typeof verifyToken).toBe("string");
});

test("volunteerVerificationModel.createOneWithToken - error 1", async () => {
    jest.spyOn(volunteerModel, "getOneByEmail").mockResolvedValue(mockVolunteer[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerVerificationModel.getOneByEmail
            .mockResolvedValueOnce([[]])
    };
    let data = {
        email: "volunteer110@domain.com",
        password: "123456",
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "2",
    };
    let fn = async () => {
        await volunteerVerificationModel.createOne(conn, data);
    }
    await expect(fn).rejects.toThrow();
});