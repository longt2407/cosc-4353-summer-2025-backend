import httpResp from "../../helpers/httpResp.js";
import { HttpError } from "../../helpers/error.js";

// Success[200]
test("httpResp.Success[200]", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Success[200](req, res, null);
    expect(res.statusCode).toBe(200);
});

// Error.default
test("httpResp.Error.default 1", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error.default(req, res, new Error("error"));
    expect(res.statusCode).toBe(500);
});

test("httpResp.Error.default 2", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error.default(req, res, new HttpError({
        statusCode: 404,
        message: "error"
    }));
    expect(res.statusCode).toBe(404);
});

// Error[500]
test("httpResp.Error[500] 1", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[500](req, res, new Error("error"));
    expect(res.statusCode).toBe(500);
});

test("httpResp.Error[500] 2", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[500](req, res, null);
    expect(res.statusCode).toBe(500);
});

// Error[404]
test("httpResp.Error[404] 1", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[404](req, res, new Error("error"));
    expect(res.statusCode).toBe(404);
});

test("httpResp.Error[404] 2", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[404](req, res, null);
    expect(res.statusCode).toBe(404);
});

// Error[401]
test("httpResp.Error[401] 1", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[401](req, res, new Error("error"));
    expect(res.statusCode).toBe(401);
});

test("httpResp.Error[401] 2", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[401](req, res, null);
    expect(res.statusCode).toBe(401);
});

// Error[400]
test("httpResp.Error[400] 1", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[400](req, res, new Error("error"));
    expect(res.statusCode).toBe(400);
});

test("httpResp.Error[400] 2", () => {
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    httpResp.Error[400](req, res, null);
    expect(res.statusCode).toBe(400);
});
