import auth from "../../helpers/auth.js";
import { HttpError } from "../../helpers/error.js";

jest.mock('../../helpers/jwt.js');

const VOLUNTEER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYwMDk5NTksImRhdGEiOnsiaWQiOjEsImVtYWlsIjoidm9sdW50ZWVyMUBkb21haW4uY29tIiwicm9sZSI6MH0sImlhdCI6MTc1MzQxNzk1OX0.Wa-LLfo01fIMwOH9c1pxVIpQqb7WE4DCyvo-oyguy60";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTYwMTAwMjMsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoiYWRtaW4xQGRvbWFpbi5jb20iLCJyb2xlIjoxfSwiaWF0IjoxNzUzNDE4MDIzfQ.qJZLEdAIdsatvTP4wQsxdRIu6z8OjHW7J4AVsIBKrU0";

test("auth.is", () => {
    let handler = auth.is(auth.VOLUNTEER);
    let req = {
        body: {
            authorization: VOLUNTEER_TOKEN,
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    handler(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
});

test("auth.is - error 1", () => {
    let handler = auth.is(auth.ADMIN);
    let req = {
        headers: {
            authorization: VOLUNTEER_TOKEN
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    handler(req, res, next);
    expect(res.statusCode).not.toBe(200);
});

test("auth.is - error 2", () => {
    let handler = auth.is(auth.VOLUNTEER);
    let req = {
        headers: {
            authorization: "invalid_token"
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    handler(req, res, next);
    expect(res.statusCode).not.toBe(200);
});

test("auth.is - error 3", () => {
    let handler = auth.is(auth.VOLUNTEER);
    let req = {};
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    const next = jest.fn();
    handler(req, res, next);
    expect(res.statusCode).not.toBe(200);
});
