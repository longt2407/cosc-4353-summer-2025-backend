import mysql from "mysql2/promise";
import db from "../../controllers/db.js";

jest.mock("mysql2/promise", () => {
    const mockConn = {
        beginTransaction: jest.fn(() => Promise.resolve()),
        commit: jest.fn(() => Promise.resolve()),
        rollback: jest.fn(() => Promise.resolve()),
        release: jest.fn() 
    };
    const mockPool = {
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

test("db.tx", async () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let func = () => {
        return null;
    };
    await db.tx(req, res, func);
    expect(mysql.createPool().getConnection).toHaveBeenCalled();
    let conn = await mysql.createPool().getConnection();
    expect(conn.beginTransaction).toHaveBeenCalled();
    expect(conn.commit).toHaveBeenCalled();
    expect(conn.rollback).not.toHaveBeenCalled();
    expect(conn.release).toHaveBeenCalled();
});

test("db.tx - error", async () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let func = () => {
        throw new Error("error");
    };
    await db.tx(req, res, func);
    expect(mysql.createPool().getConnection).toHaveBeenCalled();
    let conn = await mysql.createPool().getConnection();
    expect(conn.beginTransaction).toHaveBeenCalled();
    expect(conn.commit).not.toHaveBeenCalled();
    expect(conn.rollback).toHaveBeenCalled();
    expect(conn.release).toHaveBeenCalled();
});

