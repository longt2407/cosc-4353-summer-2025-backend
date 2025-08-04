import volunteerModel from "../../models/volunteer.js";
import volunteerVerificationModel from "../../models/volunteerVerification.js";
jest.mock("../../helpers/jwt.js");

var cloneMockVolunteer;
var cloneMockVolunteerVerification;

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
    skill: JSON.stringify(["communication", "technology", "leader"]),
    preference: null,
    availability: JSON.stringify([
        "2025-07-31T07:11:19.409Z", 
        "2025-08-01T07:11:19.409Z", 
        "2025-08-02T07:11:19.409Z" 
    ]),
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
    skill: JSON.stringify(["strong", "technology"]),
    preference: null,
    availability: JSON.stringify([ 
        "2025-08-02T07:12:29.714Z", 
        "2025-08-03T07:12:29.714Z", 
        "2025-08-04T07:12:29.714Z" 
    ]),
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

beforeEach(() => {
    cloneMockVolunteer = JSON.parse(JSON.stringify(mockVolunteer));
    cloneMockVolunteerVerification = JSON.parse(JSON.stringify(mockVolunteerVerification));
});

afterEach(() => {
    jest.restoreAllMocks();
});

// prepare
test("volunteerModel.prepare 1", async () => {
    volunteerModel.prepare(cloneMockVolunteer);
    expect(cloneMockVolunteer[0].password).toBe(undefined);
});

// parse
test("volunteerModel.parse 1", async () => {
    volunteerModel.parse(cloneMockVolunteer[0]);
    expect(Array.isArray(cloneMockVolunteer[0].skill)).toBe(true);
});

test("volunteerModel.parse 2", async () => {
    delete cloneMockVolunteer[0].skill;
    delete cloneMockVolunteer[0].availability;
    volunteerModel.parse(cloneMockVolunteer[0]);
    expect(cloneMockVolunteer[0].skill).toBe(undefined);
});

test("volunteerModel.parse 3", async () => {
    cloneMockVolunteer[0] = null;
    volunteerModel.parse(cloneMockVolunteer[0]);
    expect(cloneMockVolunteer[0]).toBe(null);
});

// stringify
test("volunteerModel.stringify 1", async () => {
    volunteerModel.parse(cloneMockVolunteer)
    volunteerModel.stringify(cloneMockVolunteer);
    expect(typeof cloneMockVolunteer[0].skill).toBe("string");
});

test("volunteerModel.stringify 2", async () => {
    delete cloneMockVolunteer[0].skill;
    delete cloneMockVolunteer[0].availability;
    volunteerModel.parse(cloneMockVolunteer)
    volunteerModel.stringify(cloneMockVolunteer);
    expect(cloneMockVolunteer[0].skill).toBe(undefined);
});

test("volunteerModel.stringify 3", async () => {
    cloneMockVolunteer[0] = null;
    volunteerModel.parse(cloneMockVolunteer)
    volunteerModel.stringify(cloneMockVolunteer);
    expect(cloneMockVolunteer[0]).toBe(null);
});

// validate
test("volunteerModel.validate - error 1", async () => {
    let fn = () => {
        volunteerModel.validator.validate({
            email: "invalid email"
        });
    } 
    expect(fn).toThrow();
});

test("volunteerModel.validate - error 2", async () => {
    let fn = () => {
        volunteerModel.validator.validate({
            address_state: "XXX"
        });
    } 
    expect(fn).toThrow();
});

test("volunteerModel.validate - error 3", async () => {
    let fn = () => {
        volunteerModel.validator.validate({
            address_zip: "1234"
        });
    } 
    expect(fn).toThrow();
});

test("volunteerModel.validate - error 4", async () => {
    let fn = () => {
        volunteerModel.validator.validate({
            address_state: "TT"
        });
    } 
    expect(fn).toThrow();
});

// getOneByEmail
test("volunteerModel.getOneByEmail 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockVolunteer[0]]])
    };
    let email = "volunteer1@domain.com";
    let data = await volunteerModel.getOneByEmail(conn, email);
    expect(data.id).toBe(cloneMockVolunteer[0].id);
});

test("volunteerModel.getOneByEmail 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let email = "volunteer1@domain.com";
    let data = await volunteerModel.getOneByEmail(conn, email);
    expect(data).toBe(null);
});

// getOneByEmailAndPwd
test("volunteerModel.getOneByEmailAndPwd 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockVolunteer[0]]])
    };
    let email = "volunteer1@domain.com";
    let password = "123456";
    let data = await volunteerModel.getOneByEmailAndPwd(conn, email, password);
    expect(data.id).toBe(cloneMockVolunteer[0].id);
});

test("volunteerModel.getOneByEmailAndPwd 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockVolunteer[0]]])
    };
    let email = "volunteer1@domain.com";
    let password = "654321";
    let data = await volunteerModel.getOneByEmailAndPwd(conn, email, password);
    expect(data).toBe(null);
});

test("volunteerModel.getOneByEmailAndPwd 3", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let email = "volunteer1@domain.com";
    let password = "123456";
    let data = await volunteerModel.getOneByEmailAndPwd(conn, email, password);
    expect(data).toBe(null);
});

// createOneWithToken
test("volunteerModel.createOneWithToken 1", async () => {
    jest.spyOn(volunteerVerificationModel, "getOneByToken").mockResolvedValue(cloneMockVolunteerVerification[0]);
    jest.spyOn(volunteerVerificationModel, "deleteOneByToken").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerModel.getOneByEmail
            .mockResolvedValueOnce([{ insertId: 1 }])
    };
    let data = await volunteerModel.createOneWithToken(conn, {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
        first_name: "f",
        middle_name: "",
        last_name: "l",
        address_1: "a1",
        address_2: "",
        address_city: "c",
        address_state: "TX",
        address_zip: "70000",
        skill: ["s1", "s2"],
        preference: "",
        availability: [
            "2025-07-18T07:58:41.362Z",
            "2025-07-19T07:58:41.362Z"
        ]
    });
    expect(data).toBe(1);
});

test("volunteerModel.createOneWithToken - error 1", async () => {
    jest.spyOn(volunteerVerificationModel, "getOneByToken").mockResolvedValue(cloneMockVolunteerVerification[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerModel.getOneByEmail
            .mockResolvedValue([{ insertId: 1 }])
    };
    let fn = async () => {
        await volunteerModel.createOneWithToken(conn, {
            token: "invalid token",
            first_name: "f",
            middle_name: "",
            last_name: "l",
            address_1: "a1",
            address_2: "",
            address_city: "c",
            address_state: "TX",
            address_zip: "70000",
            skill: ["s1", "s2"],
            preference: "",
            availability: [
                "2025-07-18T07:58:41.362Z",
                "2025-07-19T07:58:41.362Z"
            ]
        });
    };
    await expect(fn).rejects.toThrow();
});

test("volunteerModel.createOneWithToken - error 2", async () => {
    jest.spyOn(volunteerVerificationModel, "getOneByToken").mockResolvedValue(null);
    jest.spyOn(volunteerModel, "getOneByEmail").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerModel.getOneByEmail
            .mockResolvedValue([{ insertId: 1 }])
    };
    let fn = async () => {
        await volunteerModel.createOneWithToken(conn, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
            first_name: "f",
            middle_name: "",
            last_name: "l",
            address_1: "a1",
            address_2: "",
            address_city: "c",
            address_state: "TX",
            address_zip: "70000",
            skill: ["s1", "s2"],
            preference: "",
            availability: [
                "2025-07-18T07:58:41.362Z",
                "2025-07-19T07:58:41.362Z"
            ]
        });
    };
    await expect(fn).rejects.toThrow();
});

test("volunteerModel.createOneWithToken - error 3", async () => {
    jest.spyOn(volunteerVerificationModel, "getOneByToken").mockResolvedValue(cloneMockVolunteerVerification[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[cloneMockVolunteer[0]]]) // volunteerModel.getOneByEmail
            .mockResolvedValue([{ insertId: 1 }])
    };
    let fn = async () => {
        await volunteerModel.createOneWithToken(conn, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYyNzMxODksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW5AZG9tYWluLmNvbSIsInJvbGUiOjF9LCJpYXQiOjE3NTM2ODExODl9.cqfBJUoaethUDys7ysZrr9opWwYQcwSrO5evcePsO78",
            first_name: "f",
            middle_name: "",
            last_name: "l",
            address_1: "a1",
            address_2: "",
            address_city: "c",
            address_state: "TX",
            address_zip: "70000",
            skill: ["s1", "s2"],
            preference: "",
            availability: [
                "2025-07-18T07:58:41.362Z",
                "2025-07-19T07:58:41.362Z"
            ]
        });
    };
    await expect(fn).rejects.toThrow();
});

// getOne
test("volunteerModel.getOne 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockVolunteer[0]]])
    };
    let id = 1;
    let data = await volunteerModel.getOne(conn, id);
    expect(data.id).toBe(cloneMockVolunteer[0].id);
});

test("volunteerModel.getOne 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let id = 1;
    let data = await volunteerModel.getOne(conn, id);
    expect(data).toBe(null);
});

// getOneByEmailAndAnswer
test("volunteerModel.getOneByEmailAndAnswer 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockVolunteer[0]]]) // volunteerModel.getOneByEmail
    };
    let email = "volunteer1@domain.com";
    let answer = "2";
    let data = await volunteerModel.getOneByEmailAndAnswer(conn, email, answer);
    expect(data.id).toBe(cloneMockVolunteer[0].id);
});

test("volunteerModel.getOneByEmailAndAnswer 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockVolunteer[0]]]) // volunteerModel.getOneByEmail
    };
    let email = "volunteer1@domain.com";
    let answer = "4";
    let data = await volunteerModel.getOneByEmailAndAnswer(conn, email, answer);
    expect(data).toBe(null);
});

test("volunteerModel.getOneByEmailAndAnswer 3", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]]) // volunteerModel.getOneByEmail
    };
    let email = "volunteer1@domain.com";
    let answer = "2";
    let data = await volunteerModel.getOneByEmailAndAnswer(conn, email, answer);
    expect(data).toBe(null);
});

// updatePassword
test("volunteerModel.updatePassword 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[cloneMockVolunteer[0]]]) // volunteerModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let password = "123456";
    let data = await volunteerModel.updatePassword(conn, id, password);
    expect(data).toBe(id);
});

test("volunteerModel.updatePassword - error 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let password = "123456";
    let fn = async () => {
        await volunteerModel.updatePassword(conn, id, password);
    }
    await expect(fn).rejects.toThrow();
});

// updateQuestionAndAnswer
test("volunteerModel.updateQuestionAndAnswer 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]]) // volunteerModel.getOneByEmail
    };
    let id = 1;
    let reset_password_question = "2 + 2 = ?";
    let reset_password_answer = "4"
    let data = await volunteerModel.updateQuestionAndAnswer(conn, id, reset_password_question, reset_password_answer);
    expect(data).toEqual(id);
});

// updateOne
test("volunteerModel.updateOne 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[cloneMockVolunteer[0]]]) // volunteerModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let data = await volunteerModel.updateOne(conn, {
        id,
        first_name: "f",
        middle_name: "m",
        last_name: "l",
        address_1: "a1",
        address_2: "",
        address_city: "c",
        address_state: "TX",
        address_zip: "70000",
        skill: ["s1", "s2"],
        preference: "",
        availability: [
            "2025-07-18T07:58:41.362Z",
            "2025-07-19T07:58:41.362Z"
        ]
    });
    expect(data).toEqual(id);
});

test("volunteerModel.updateOne - error 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]]) // volunteerModel.getOne
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let fn = async () => {
        await volunteerModel.updateOne(conn, {
            id,
            first_name: "f",
            middle_name: "m",
            last_name: "l",
            address_1: "a1",
            address_2: "",
            address_city: "c",
            address_state: "TX",
            address_zip: "70000",
            skill: ["s1", "s2"],
            preference: "",
            availability: [
                "2025-07-18T07:58:41.362Z",
                "2025-07-19T07:58:41.362Z"
            ]
        });
    }
    await expect(fn).rejects.toThrow();
});

// getAll
test("volunteerModel.getAll 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([cloneMockVolunteer])
    };
    let data = await volunteerModel.getAll(conn);
    expect(data).toEqual(cloneMockVolunteer);
});

// getAllAssignedByEventId
test("volunteerModel.getAllAssignedByEventId 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([cloneMockVolunteer])
    };
    let eventId = 1;
    let data = await volunteerModel.getAllAssignedByEventId(conn, eventId);
    expect(data).toEqual(cloneMockVolunteer);
});

