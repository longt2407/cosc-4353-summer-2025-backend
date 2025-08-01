import adminModel from "../../models/admin.js";
import adminVerificationModel from "../../models/adminVerification.js";
import jwt from "../../helpers/jwt.js";
jest.mock("../../helpers/jwt.js");

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
}];

afterEach(() => {
    jest.restoreAllMocks();
});

// validator
test("adminVerificationModel.validate - error 1", async () => {
    let fn = () => {
        adminVerificationModel.validator.validate({
            email: "invalid email"
        });
    } 
    expect(fn).toThrow();
});

// getOneByEmail
test("adminVerificationModel.getOneByEmail 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdminVerification[0]]])
    };
    let email = "admin101@domain.com";
    let data = await adminVerificationModel.getOneByEmail(conn, email);
    expect(data).toEqual(mockAdminVerification[0]);
});

test("adminVerificationModel.getOneByEmail 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let email = "admin101@domain.com";
    let data = await adminVerificationModel.getOneByEmail(conn, email);
    expect(data).toBe(null);
});

// getOneByToken
test("adminVerificationModel.getOneByToken 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdminVerification[0]]])
    };
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78";
    let data = await adminVerificationModel.getOneByToken(conn, token);
    expect(data).toEqual(mockAdminVerification[0]);
});

test("adminVerificationModel.getOneByToken 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78";
    let data = await adminVerificationModel.getOneByToken(conn, token);
    expect(data).toBe(null);
});

// deleteOneByToken
test("adminVerificationModel.deleteOneByToken 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([null])
    };
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78";
    let data = await adminVerificationModel.deleteOneByToken(conn, token);
    expect(data).toBe(null);
});

// createOneWithToken
test("adminVerificationModel.createOneWithToken 1", async () => {
    jest.spyOn(adminModel, "getOneByEmail").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockAdminVerification[0]]]) // adminVerificationModel.getOneByEmail
            .mockResolvedValueOnce([[]])
    };
    let data = {
        email: "admin110@domain.com",
        password: "123456",
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "2",
    };
    let verifyToken = await adminVerificationModel.createOne(conn, data);
    expect(verifyToken).toBe(jwt.sign({ email: data.email }));
});

test("adminVerificationModel.createOneWithToken 2", async () => {
    jest.spyOn(adminModel, "getOneByEmail").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminVerificationModel.getOneByEmail
            .mockResolvedValueOnce([[]])
    };
    let data = {
        email: "admin110@domain.com",
        password: "123456",
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "2",
    };
    let verifyToken = await adminVerificationModel.createOne(conn, data);
    expect(verifyToken).toBe(jwt.sign({ email: data.email }));
});

test("adminVerificationModel.createOneWithToken - error 1", async () => {
    jest.spyOn(adminModel, "getOneByEmail").mockResolvedValue(mockAdmin[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminVerificationModel.getOneByEmail
            .mockResolvedValueOnce([[]])
    };
    let data = {
        email: "admin110@domain.com",
        password: "123456",
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "2",
    };
    let fn = async () => {
        await adminVerificationModel.createOne(conn, data);
    }
    await expect(fn).rejects.toThrow();
});