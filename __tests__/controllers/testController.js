import mysql from "mysql2/promise";
import testContoller from "../../controllers/test.js";

var mockConn;
var mockPool;

jest.mock("mysql2/promise", () => {
    mockConn = {
        beginTransaction: jest.fn(() => Promise.resolve()),
        commit: jest.fn(() => Promise.resolve()),
        rollback: jest.fn(() => Promise.resolve()),
        release: jest.fn() 
    };
    mockPool = {
        getConnection: jest.fn(() => {
            return Promise.resolve(mockConn);
        })
    };
    return {
        createPool: jest.fn(() => {
            return mockPool;
        })
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("testContoller.echoGet", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    testContoller.echoGet(req, res);
    expect(res.statusCode).toBe(200);
});

test("testContoller.echoPost", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    testContoller.echoPost(req, res);
    expect(res.statusCode).toBe(200);
});

test("testContoller.echoPatch", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    testContoller.echoPatch(req, res);
    expect(res.statusCode).toBe(200);
});

test("testContoller.echoDelete", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    testContoller.echoDelete(req, res);
    expect(res.statusCode).toBe(200);
});

test("testContoller.auth", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    testContoller.auth(req, res);
    expect(res.statusCode).toBe(200);
});

// testDB
test("testContoller.testDB", async () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    await testContoller.testDB(req, res);
    expect(mockPool.getConnection).toHaveBeenCalled();
    expect(mockConn.beginTransaction).toHaveBeenCalled();
    expect(mockConn.commit).toHaveBeenCalled();
    expect(mockConn.rollback).not.toHaveBeenCalled();
    expect(mockConn.release).toHaveBeenCalled();
});

test("testContoller.testDB - error", async () => {
    jest.spyOn(mockConn, "commit").mockRejectedValue(new Error("error"));
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    await testContoller.testDB(req, res);
    expect(mockPool.getConnection).toHaveBeenCalled();
    expect(mockConn.beginTransaction).toHaveBeenCalled();
    expect(mockConn.commit).toHaveBeenCalled();
    expect(mockConn.rollback).toHaveBeenCalled();
    expect(mockConn.release).toHaveBeenCalled();
});