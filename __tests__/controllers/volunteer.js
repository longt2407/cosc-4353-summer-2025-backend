import volunteerController from "../../controllers/volunteer.js";

jest.mock('../../helpers/jwt.js');
jest.mock('../../controllers/db.js');
jest.mock('../../models/volunteer.js');
jest.mock('../../models/volunteerVerification.js');

// login
test("volunteerController.login", async () => {
    let req = {
        body: {
            email: "volunteer1@domain.com",
            password: "123456"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.login(req, res);
    expect(res.statusCode).toBe(200);
});

test("volunteerController.login", async () => {
    let req = {
        body: {
            email: "volunteer10@domain.com",
            password: "123456"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.login(req, res);
    expect(res.statusCode).not.toBe(200);
});

// register
test("volunteerController.register", async () => {
    let req = {
        body: {
            email: "volunteer101@domain.com",
            password: "123456",
            reset_password_question: "1 + 1 = ?",
            reset_password_answer: "2"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.register(req, res);
    expect(res.statusCode).toBe(200);
});

// verify
test("volunteerController.verify", async () => {
    let req = {
        body: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYwMDgxNTMsImRhdGEiOnsiZW1haWwiOiJ2b2x1bnRlZXIxMDFAZG9tYWluLmNvbSJ9LCJpYXQiOjE3NTM0MTYxNTN9.QjsrvVz4ACHOcI8OV4dH-hZTOvcghLDeK7GjqKQlzi8",
            first_name: "f",
            middle_name: "",
            last_name: "l",
            address_1: "a1",
            address_2: "",
            address_city: "c",
            address_state: "ss",
            address_zip: "70000",
            skill: ["s1", "s2"],
            preference: "",
            availability: [
                "2025-07-18T07:58:41.362Z",
                "2025-07-19T07:58:41.362Z"
            ]
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.verify(req, res);
    expect(res.statusCode).toBe(200);
});

// getQuestion
test("volunteerController.getQuestion", async () => {
    let req = {
        body: {
            email: "volunteer1@domain.com"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.getQuestion(req, res);
    expect(res.statusCode).toBe(200);
});

test("volunteerController.getQuestion", async () => {
    let req = {
        body: {
            email: "volunteer10@domain.com"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.getQuestion(req, res);
    expect(res.statusCode).not.toBe(200);
});

// forget
test("volunteerController.forget", async () => {
    let req = {
        body: {
            email: "volunteer1@domain.com",
            reset_password_answer: "2",
            password: "654321"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.forget(req, res);
    expect(res.statusCode).toBe(200);
});

test("volunteerController.forget", async () => {
    let req = {
        body: {
            email: "volunteer10@domain.com",
            reset_password_answer: "2",
            password: "654321"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.forget(req, res);
    expect(res.statusCode).not.toBe(200);
});

// updatePassword
test("volunteerController.updatePassword", async () => {
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
    let data = await volunteerController.updatePassword(req, res);
    expect(res.statusCode).toBe(200);
});

// updateQuestionAndAnswer
test("volunteerController.updateQuestionAndAnswer", async () => {
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
    let data = await volunteerController.updateQuestionAndAnswer(req, res);
    expect(res.statusCode).toBe(200);
});

// getProfile
test("volunteerController.getProfile", async () => {
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
    let data = await volunteerController.getProfile(req, res);
    expect(res.statusCode).toBe(200);
});

// updateProfile
test("volunteerController.updateProfile", async () => {
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
            address_1: "a1",
            address_2: "",
            address_city: "c",
            address_state: "ss",
            address_zip: "70000",
            skill: ["s1", "s2"],
            preference: "",
            availability: [
                "2025-07-18T07:58:41.362Z",
                "2025-07-19T07:58:41.362Z"
            ]
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await volunteerController.updateProfile(req, res);
    expect(res.statusCode).toBe(200);
});