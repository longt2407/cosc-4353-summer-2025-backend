import adminController from "../../controllers/admin.js";

jest.mock('../../helpers/jwt.js');
jest.mock('../../controllers/db.js');
jest.mock('../../models/admin.js');
jest.mock('../../models/adminVerification.js');

test("adminController.login", async () => {
    let req = {
        body: {
            email: "admin1@domain.com",
            password: "123456"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.login(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.login - error", async () => {
    let req = {
        body: {
            email: "admin10@domain.com",
            password: "123456"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.login(req, res);
    expect(res.statusCode).not.toBe(200);
});

test("adminController.register", async () => {
    let req = {
        body: {
            email: "admin101@domain.com",
            password: "123456",
            reset_password_question: "1 + 1 = ?",
            reset_password_answer: "123456"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.register(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.verify", async () => {
    let req = {
        body: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
            first_name: "f",
            middle_name: "",
            last_name: "l",
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.verify(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.getQuestion", async () => {
    let req = {
        body: {
            email: "admin1@domain.com"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.getQuestion(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.getQuestion - error", async () => {
    let req = {
        body: {
            email: "admin10@domain.com"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.getQuestion(req, res);
    expect(res.statusCode).not.toBe(200);
});

test("adminController.forget", async () => {
    let req = {
        body: {
            email: "admin1@domain.com",
            reset_password_answer: "2",
            password: "654321"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.forget(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.forget", async () => {
    let req = {
        body: {
            email: "admin10@domain.com",
            reset_password_answer: "2",
            password: "654321"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.forget(req, res);
    expect(res.statusCode).not.toBe(200);
});

test("adminController.updatePassword", async () => {
    let req = {
        jwt: {
            user: {
                id: 1
            }
        },
        body: {
            password: "654321"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.updatePassword(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.updateQuestionAndAnswer", async () => {
    let req = {
        jwt: {
            user: {
                id: 1
            }
        },
        body: {
            reset_password_question: "2 ^ 2 = ?",
            reset_password_answer: "4"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.updateQuestionAndAnswer(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.getProfile", async () => {
    let req = {
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.getProfile(req, res);
    expect(res.statusCode).toBe(200);
});

test("adminController.updateProfile", async () => {
    let req = {
        jwt: {
            user: {
                id: 1
            }
        },
        body: {
            first_name: "f",
            middle_name: "",
            last_name: "l",
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await adminController.updateProfile(req, res);
    expect(res.statusCode).toBe(200);
});