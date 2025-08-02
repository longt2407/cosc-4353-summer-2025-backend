import volunteerEventModel from "../../models/volunteerEvent";
import eventModel from "../../models/event";
jest.mock("../../models/event.js");

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

const mockEvent = [{
    id: 1,
    admin_id: 1,
    admin: {
        id: 1,
        email: "admin1@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Admin 1",
        middle_name: null,
        last_name: "Account",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    },
    name: "Event A",
    description: "Description of Event A",
    location: "Location A",
    skill: JSON.stringify(["communication","technology","leader"]),
    urgency: 0,
    date: new Date(),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}, {
    id: 2,
    admin_id: 2,
    admin: {
        id: 2,
        email: "admin2@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Admin 2",
        middle_name: null,
        last_name: "Account",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    },
    name: "Event B",
    description: "Description of Event B",
    location: "Location B",
    skill: JSON.stringify(["communication","technology"]),
    urgency: 1,
    date: new Date(),
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
}];

const mockVolunteerEvent = [{
    id: 1,
    event_id: 1,
    volunteer_id: 1,
    status: 0
}, {
    id: 2,
    event_id: 1,
    volunteer_id: 2,
    status: 0
}];

afterEach(() => {
    jest.restoreAllMocks();
});

// validate
test("volunteerEventModel.validate 1", async () => {
    let fn = () => {
        volunteerEventModel.validator.validate({
            status: 1
        });
    } 
    expect(fn).not.toThrow();
});

test("volunteerEventModel.validate - error 1", async () => {
    let fn = () => {
        volunteerEventModel.validator.validate({
            status: 4
        });
    } 
    expect(fn).toThrow();
});

// assignVolunteer
test("volunteerEventModel.assignVolunteer 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let data = await volunteerEventModel.assignVolunteer(conn, eventId, volunteerId, adminId);
    expect(data).toBe(null);
});

test("volunteerEventModel.assignVolunteer - error 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[1]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.assignVolunteer(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.assignVolunteer - error 2", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.assignVolunteer(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.assignVolunteer - error 3", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteer[0]]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.assignVolunteer(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

// dropVolunteer
test("volunteerEventModel.dropVolunteer 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteer[0]]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let data = await volunteerEventModel.dropVolunteer(conn, eventId, volunteerId, adminId);
    expect(data).toBe(null);
});

test("volunteerEventModel.dropVolunteer - error 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[1]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteer[0]]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.dropVolunteer(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.dropVolunteer - error 2", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteer[0]]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.dropVolunteer(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.dropVolunteer - error 3", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.dropVolunteer(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

// updateParticipatedStatus
test("volunteerEventModel.updateParticipatedStatus 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteer[0]]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let data = await volunteerEventModel.updateParticipatedStatus(conn, eventId, volunteerId, adminId);
    expect(data).toBe(null);
});

test("volunteerEventModel.updateParticipatedStatus - error 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[1]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.updateParticipatedStatus(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.updateParticipatedStatus - error 2", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.updateParticipatedStatus(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.updateParticipatedStatus - error 3", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.updateParticipatedStatus(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

// updateNoShowStatus
test("volunteerEventModel.updateNoShowStatus 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[mockVolunteer[0]]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let data = await volunteerEventModel.updateNoShowStatus(conn, eventId, volunteerId, adminId);
    expect(data).toBe(null);
});

test("volunteerEventModel.updateNoShowStatus - error 1", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[1]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.updateNoShowStatus(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.updateNoShowStatus - error 2", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(null);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.updateNoShowStatus(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});

test("volunteerEventModel.updateNoShowStatus - error 3", async () => {
    jest.spyOn(eventModel, "getOne").mockResolvedValue(mockEvent[0]);
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let eventId = 1
    let volunteerId = 1;
    let adminId = 1
    let func = async () => await volunteerEventModel.updateNoShowStatus(conn, eventId, volunteerId, adminId);
    await expect(func).rejects.toThrow();
});