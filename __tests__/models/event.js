import eventModel from "../../models/event";
jest.mock("../../models/admin.js");

var cloneMockEvent;

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

beforeEach(() => {
    cloneMockEvent = JSON.parse(JSON.stringify(mockEvent));
});

afterEach(() => {
    jest.restoreAllMocks();
});

// prepare
test("eventModel.prepare 1", async () => {
    eventModel.prepare(cloneMockEvent);
    expect(cloneMockEvent[0].admin.password).toBe(undefined);
});

test("eventModel.prepare 2", async () => {
    delete cloneMockEvent[0].admin;
    eventModel.prepare(cloneMockEvent);
    expect(cloneMockEvent[0].admin).toBe(undefined);
});

// parse
test("eventModel.parse 1", async () => {
    eventModel.parse(cloneMockEvent[0]);
    expect(Array.isArray(cloneMockEvent[0].skill)).toBe(true);
});

test("eventModel.parse 2", async () => {
    delete cloneMockEvent[0].skill;
    eventModel.parse(cloneMockEvent[0]);
    expect(cloneMockEvent[0].skill).toBe(undefined);
});

test("eventModel.parse 3", async () => {
    cloneMockEvent[0] = null;
    eventModel.parse(cloneMockEvent[0]);
    expect(cloneMockEvent[0]).toBe(null);
});

// include
test("eventModel.inlcude 1", async () => {
    let conn = {};
    await eventModel.include(conn, cloneMockEvent[0]);
    expect(cloneMockEvent[0].admin).not.toBe(undefined);
});

test("eventModel.inlcude 2", async () => {
    let conn = {};
    delete cloneMockEvent[0].admin_id;
    await eventModel.include(conn, cloneMockEvent[0]);
    expect(cloneMockEvent[0].admin_id).toBe(undefined);
});

test("eventModel.inlcude 3", async () => {
    let conn = {};
    let data = [null];
    await eventModel.include(conn, data);
    expect(data).toEqual([null]);
});

// stringify
test("eventModel.stringify 1", async () => {
    eventModel.parse(cloneMockEvent)
    eventModel.stringify(cloneMockEvent);
    expect(typeof cloneMockEvent[0].skill).toBe("string");
});

test("eventModel.stringify 2", async () => {
    delete cloneMockEvent[0].skill;
    eventModel.parse(cloneMockEvent)
    eventModel.stringify(cloneMockEvent);
    expect(cloneMockEvent[0].skill).toBe(undefined);
});

test("eventModel.stringify 3", async () => {
    cloneMockEvent[0] = null;
    eventModel.parse(cloneMockEvent)
    eventModel.stringify(cloneMockEvent);
    expect(cloneMockEvent[0]).toBe(null);
});

// validate
test("eventModel.validate - error 1", async () => {
    let fn = () => {
        eventModel.validator.validate({
            urgency: 10
        });
    } 
    expect(fn).toThrow();
});

// getAllByAdminId
test("eventModel.getAllByAdminId 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([cloneMockEvent])
    };
    let adminId = 1;
    let data = await eventModel.getAllByAdminId(conn, adminId);
    expect(data).toEqual(cloneMockEvent);
});

test("eventModel.getAllByAdminId 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let adminId = 1;
    let data = await eventModel.getAllByAdminId(conn, adminId);
    expect(data).toEqual([]);
});

// getOneByAdminId
test("eventModel.getOneByAdminId 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockEvent[0]]])
    };
    let id = 1;
    let adminId = 1;
    let data = await eventModel.getOneByAdminId(conn, id, adminId);
    expect(data).toEqual(cloneMockEvent[0]);
});

test("eventModel.getOneByAdminId 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let id = 1;
    let adminId = 1;
    let data = await eventModel.getOneByAdminId(conn, id, adminId);
    expect(data).toBe(null);
});

// getOne
test("eventModel.getOne 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[cloneMockEvent[0]]])
    };
    let id = 1;
    let data = await eventModel.getOne(conn, id);
    expect(data).toEqual(cloneMockEvent[0]);
});

test("eventModel.getOne 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([[]])
    };
    let id = 1;
    let data = await eventModel.getOne(conn, id);
    expect(data).toBe(null);
});

// createOne
test("eventModel.createOne 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValue([{ insertId: 1 }])
    };
    let event = {
        admin_id: 1,
        name: "event",
        description: "event description",
        location: "event location",
        skill: ["communication", "technology"],
        urgency: 1,
        date: (new Date()).toISOString()
    };
    let data = await eventModel.createOne(conn, event);
    expect(data).toEqual(1);
});

// updateOne
test("eventModel.updateOne 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValueOnce([[cloneMockEvent[0]]]).mockResolvedValueOnce([[]])
    };
    let event = {
        id: 1,
        admin_id: 1,
        name: "event",
        description: "event description",
        location: "event location",
        skill: ["communication", "technology"],
        urgency: 1,
        date: (new Date()).toISOString()
    };
    let data = await eventModel.updateOne(conn, event);
    expect(data).toEqual(1);
});

test("eventModel.updateOne - error 1", async () => {
    let conn = {
        query: jest.fn().mockResolvedValueOnce([[cloneMockEvent[0]]]).mockResolvedValueOnce([[]])
    };
    let event = {
        id: 1,
        admin_id: 2,
        name: "event",
        description: "event description",
        location: "event location",
        skill: ["communication", "technology"],
        urgency: 1,
        date: (new Date()).toISOString()
    };
    let func = async () => await eventModel.updateOne(conn, event);
    await expect(func).rejects.toThrow();
});

test("eventModel.updateOne - error 2", async () => {
    let conn = {
        query: jest.fn().mockResolvedValueOnce([[]]).mockResolvedValueOnce([[]])
    };
    let event = {
        id: 1,
        admin_id: 1,
        name: "event",
        description: "event description",
        location: "event location",
        skill: ["communication", "technology"],
        urgency: 1,
        date: (new Date()).toISOString()
    };
    let func = async () => await eventModel.updateOne(conn, event);
    await expect(func).rejects.toThrow();
});

// deleteOne
test("eventModel.deleteOne 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[cloneMockEvent[0]]])
            .mockResolvedValueOnce([[{ cnt: 0 }]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let adminId = 1;
    let data = await eventModel.deleteOne(conn, id, adminId);
    expect(data).toEqual(null);
});

test("eventModel.deleteOne - error 1", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[cloneMockEvent[0]]])
            .mockResolvedValueOnce([[{ cnt: 0 }]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let adminId = 2;
    let func = async() => await eventModel.deleteOne(conn, id, adminId);
    await expect(func).rejects.toThrow();
});

test("eventModel.deleteOne - error 2", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[{ cnt: 0 }]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let adminId = 1;
    let func = async() => await eventModel.deleteOne(conn, id, adminId);
    await expect(func).rejects.toThrow();
});

test("eventModel.deleteOne - error 3", async () => {
    let conn = {
        query: jest.fn()
            .mockResolvedValueOnce([[cloneMockEvent[0]]])
            .mockResolvedValueOnce([[{ cnt: 1 }]])
            .mockResolvedValueOnce([[]])
            .mockResolvedValueOnce([[]])
    };
    let id = 1;
    let adminId = 1;
    let func = async() => await eventModel.deleteOne(conn, id, adminId);
    await expect(func).rejects.toThrow();
});