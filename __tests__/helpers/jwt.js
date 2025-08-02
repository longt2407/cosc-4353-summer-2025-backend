import jwt from "../../helpers/jwt.js";

const VOLUNTEER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTUzMjExMjIsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoidm9sdW50ZWVyQGRvbWFpbi5jb20iLCJyb2xlIjowfSwiaWF0IjoxNzUyNzI5MTIyfQ.bwCUxnpYuwGoqQwtLxD3Wenv3DqfQw1_hkwCBo_zsA0";

beforeEach(() => {
    process.env.JWT_SECRET = "secret"
    jest.resetModules();
});

afterEach(() => {
});

test("jwt.sign", async () => {
    let func = () => jwt.sign({});
    expect(func).toThrow();
});

test("jwt.verify", async () => {
    let func = () => jwt.verify(VOLUNTEER_TOKEN);
    expect(func).toThrow();
});