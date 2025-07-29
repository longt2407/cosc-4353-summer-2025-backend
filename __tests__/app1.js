import request from "supertest";
import app from "../app.js";

jest.mock("../controllers/test.js");
jest.mock("../controllers/volunteer.js");
jest.mock("../helpers/jwt.js");

const VOLUNTEER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTUzMjExMjIsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoidm9sdW50ZWVyQGRvbWFpbi5jb20iLCJyb2xlIjowfSwiaWF0IjoxNzUyNzI5MTIyfQ.bwCUxnpYuwGoqQwtLxD3Wenv3DqfQw1_hkwCBo_zsA0";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTUzMjE0OTQsImRhdGEiOnsiaWQiOjEsImVtYWlsIjoidm9sdW50ZWVyQGRvbWFpbi5jb20iLCJyb2xlIjoxfSwiaWF0IjoxNzUyNzI5NDk0fQ.m9aMtXvDi80Txn9J4PJHZwT5paOJ-KBgJkqdNrDRAkQ";

// Test
test("get /test/echo/:message", async () => {
    const response = await request(app).get("/test/echo/hello-world");
    expect(response.statusCode).toBe(200);
});

test("post /test/echo/:message", async () => {
    const response = await request(app).post("/test/echo/hello-world");
    expect(response.statusCode).toBe(200);
});

test("patch /test/echo/:message", async () => {
    const response = await request(app).patch("/test/echo/hello-world");
    expect(response.statusCode).toBe(200);
});

test("delete /test/echo/:message", async () => {
    const response = await request(app).delete("/test/echo/hello-world");
    expect(response.statusCode).toBe(200);
});

test("post /test/auth", async () => {
    const response = await request(app).post("/test/auth").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});

// Volunteer
test("post /volunteer/login", async () => {
    const response = await request(app).post("/volunteer/login");
    expect(response.statusCode).toBe(200);
});

test("post /volunteer/register", async () => {
    const response = await request(app).post("/volunteer/register");
    expect(response.statusCode).toBe(200);
});

test("post /volunteer/verify", async () => {
    const response = await request(app).post("/volunteer/verify");
    expect(response.statusCode).toBe(200);
});

test("post /volunteer/forget/question", async () => {
    const response = await request(app).post("/volunteer/forget/question");
    expect(response.statusCode).toBe(200);
});

test("post /volunteer/forget", async () => {
    const response = await request(app).post("/volunteer/forget");
    expect(response.statusCode).toBe(200);
});

test("patch /volunteer/password", async () => {
    const response = await request(app).patch("/volunteer/password").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /volunteer/qa", async () => {
    const response = await request(app).patch("/volunteer/qa").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /volunteer/profile", async () => {
    const response = await request(app).get("/volunteer/profile").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /volunteer/profile", async () => {
    const response = await request(app).patch("/volunteer/profile").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});