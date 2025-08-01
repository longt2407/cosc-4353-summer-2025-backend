import adminModel from "../../models/admin.js";
import adminVerificationModel from "../../models/adminVerification.js";
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

// prepare
test("adminModel.prepare 1", async () => {
    let clone = JSON.parse(JSON.stringify(mockAdmin));
    adminModel.prepare(clone);
    expect(clone[0].password).toBe(undefined);
});

// validate
test("adminModel.validate - error 1", async () => {
    let fn = () => {
        adminModel.validator.validate({
            email: "invalid email"
        });
    } 
    expect(fn).toThrow();
});

// getOneByEmail
test("adminModel.getOneByEmail 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdmin[0]]])
    };
    let email = "admin1@domain.com";
    let data = await adminModel.getOneByEmail(conn, email);
    expect(data).toEqual(mockAdmin[0]);
});

test("adminModel.getOneByEmail 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let email = "admin1@domain.com";
    let data = await adminModel.getOneByEmail(conn, email);
    expect(data).toBe(null);
});

// getOneByEmailAndPwd
test("adminModel.getOneByEmailAndPwd 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdmin[0]]])
    };
    let email = "admin1@domain.com";
    let password = "123456";
    let data = await adminModel.getOneByEmailAndPwd(conn, email, password);
    expect(data).toEqual(mockAdmin[0]);
});

test("adminModel.getOneByEmailAndPwd 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdmin[0]]])
    };
    let email = "admin1@domain.com";
    let password = "654321";
    let data = await adminModel.getOneByEmailAndPwd(conn, email, password);
    expect(data).toBe(null);
});

test("adminModel.getOneByEmailAndPwd 3", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let email = "admin1@domain.com";
    let password = "123456";
    let data = await adminModel.getOneByEmailAndPwd(conn, email, password);
    expect(data).toBe(null);
});

// createOneWithToken
test("adminModel.createOneWithToken 1", async () => {
    jest.spyOn(adminVerificationModel, "getOneByToken").mockResolvedValue(mockAdminVerification[0]);
    jest.spyOn(adminVerificationModel, "deleteOneByToken").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminModel.getOneByEmail
            .mockResolvedValueOnce([{ insertId: 1 }])
    };
    let data = await adminModel.createOneWithToken(conn, {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
        first_name: "f",
        middle_name: "",
        last_name: "l",
    });
    expect(data).toBe(1);
});

test("adminModel.createOneWithToken - error 1", async () => {
    jest.spyOn(adminVerificationModel, "getOneByToken").mockResolvedValue(mockAdminVerification[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminModel.getOneByEmail
            .mockResolvedValue([{ insertId: 1 }])
    };
    let fn = async () => {
        await adminModel.createOneWithToken(conn, {
            token: "invalid token",
            first_name: "f",
            middle_name: "",
            last_name: "l",
        });
    };
    await expect(fn).rejects.toThrow();
});

test("adminModel.createOneWithToken - error 2", async () => {
    jest.spyOn(adminVerificationModel, "getOneByToken").mockResolvedValue(null);
    jest.spyOn(adminModel, "getOneByEmail").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminModel.getOneByEmail
            .mockResolvedValue([{ insertId: 1 }])
    };
    let fn = async () => {
        await adminModel.createOneWithToken(conn, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
            first_name: "f",
            middle_name: "",
            last_name: "l",
        });
    };
    await expect(fn).rejects.toThrow();
});

test("adminModel.createOneWithToken - error 3", async () => {
    jest.spyOn(adminVerificationModel, "getOneByToken").mockResolvedValue(mockAdminVerification[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockAdmin[0]]]) // adminModel.getOneByEmail
            .mockResolvedValue([{ insertId: 1 }])
    };
    let fn = async () => {
        await adminModel.createOneWithToken(conn, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
            first_name: "f",
            middle_name: "",
            last_name: "l",
        });
    };
    await expect(fn).rejects.toThrow();
});

// getOne
test("adminModel.getOne 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdmin[0]]])
    };
    let id = 1;
    let data = await adminModel.getOne(conn, id);
    expect(data).toEqual(mockAdmin[0]);
});

test("adminModel.getOne 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let id = 1;
    let data = await adminModel.getOne(conn, id);
    expect(data).toBe(null);
});

// getOneByEmailAndAnswer
test("adminModel.getOneByEmailAndAnswer 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdmin[0]]]) // adminModel.getOneByEmail
    };
    let email = "admin1@domain.com";
    let answer = "123456";
    let data = await adminModel.getOneByEmailAndAnswer(conn, email, answer);
    expect(data).toEqual(mockAdmin[0]);
});

test("adminModel.getOneByEmailAndAnswer 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[mockAdmin[0]]]) // adminModel.getOneByEmail
    };
    let email = "admin1@domain.com";
    let answer = "654321";
    let data = await adminModel.getOneByEmailAndAnswer(conn, email, answer);
    expect(data).toBe(null);
});

test("adminModel.getOneByEmailAndAnswer 3", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]]) // adminModel.getOneByEmail
    };
    let email = "admin1@domain.com";
    let answer = "123456";
    let data = await adminModel.getOneByEmailAndAnswer(conn, email, answer);
    expect(data).toBe(null);
});

// updatePassword
test("adminModel.updatePassword 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockAdmin[0]]]) // adminModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let password = "123456";
    let data = await adminModel.updatePassword(conn, id, password);
    expect(data).toBe(id);
});

test("adminModel.updatePassword - error 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let password = "123456";
    let fn = async () => {
        await adminModel.updatePassword(conn, id, password);
    }
    await expect(fn).rejects.toThrow();
});

// updateQuestionAndAnswer
test("adminModel.updateQuestionAndAnswer 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]]) // adminModel.getOneByEmail
    };
    let id = 1;
    let reset_password_question = "2 + 2 = ?";
    let reset_password_answer = "4"
    let data = await adminModel.updateQuestionAndAnswer(conn, id, reset_password_question, reset_password_answer);
    expect(data).toEqual(id);
});

// updateOne
test("adminModel.updateOne 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockAdmin[0]]]) // adminModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let data = await adminModel.updateOne(conn, {
        id,
        first_name: "f",
        middle_name: "m",
        last_name: "l"
    });
    expect(data).toEqual(id);
});

test("adminModel.updateOne - error 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // adminModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let fn = async () => {
        await adminModel.updateOne(conn, {
            id,
            first_name: "f",
            middle_name: "m",
            last_name: "l"
        });
    }
    await expect(fn).rejects.toThrow();
});

// getAll
test("adminModel.getAll 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([mockAdmin])
    };
    let data = await adminModel.getAll(conn);
    expect(data).toEqual(mockAdmin);
});
