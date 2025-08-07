import request from "supertest";
import app from "../app.js";

jest.mock("../controllers/test.js");
jest.mock("../controllers/volunteer.js");
jest.mock("../controllers/admin.js");
jest.mock("../controllers/event.js");
jest.mock("../controllers/report.js");
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

test("get /test/db", async () => {
    const response = await request(app).get("/test/db");
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

test("get /volunteer", async () => {
    const response = await request(app).get("/volunteer").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /volunteer/1", async () => {
    const response = await request(app).get("/volunteer/1").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /volunteer/event/1/matched", async () => {
    const response = await request(app).get("/volunteer/event/1/matched").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /volunteer/event/1/assigned", async () => {
    const response = await request(app).get("/volunteer/event/1/assigned").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

// Admin
test("post /admin/login", async () => {
    const response = await request(app).post("/admin/login");
    expect(response.statusCode).toBe(200);
});

test("post /admin/register", async () => {
    const response = await request(app).post("/admin/register");
    expect(response.statusCode).toBe(200);
});

test("post /admin/verify", async () => {
    const response = await request(app).post("/admin/verify");
    expect(response.statusCode).toBe(200);
});

test("post /admin/forget/question", async () => {
    const response = await request(app).post("/admin/forget/question");
    expect(response.statusCode).toBe(200);
});

test("post /admin/forget", async () => {
    const response = await request(app).post("/admin/forget");
    expect(response.statusCode).toBe(200);
});

test("patch /admin/password", async () => {
    const response = await request(app).patch("/admin/password").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /admin/qa", async () => {
    const response = await request(app).patch("/admin/qa").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /admin/profile", async () => {
    const response = await request(app).get("/admin/profile").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /admin/profile", async () => {
    const response = await request(app).patch("/admin/profile").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /admin", async () => {
    const response = await request(app).get("/admin").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /admin/1", async () => {
    const response = await request(app).get("/admin/1").set("Authorization", VOLUNTEER_TOKEN);
    expect(response.statusCode).toBe(200);
});

// Event
test("get /event", async () => {
    const response = await request(app).get("/event").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /event/1", async () => {
    const response = await request(app).get("/event/1").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("post /event", async () => {
    const response = await request(app).post("/event").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /event/1", async () => {
    const response = await request(app).patch("/event/1").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("delete /event/1", async () => {
    const response = await request(app).delete("/event/1").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /event/1/assign", async () => {
    const response = await request(app).patch("/event/1/assign").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /event/1/drop", async () => {
    const response = await request(app).patch("/event/1/assign").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /event/1/status/participated", async () => {
    const response = await request(app).patch("/event/1/status/participated").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("patch /event/1/status/noshow", async () => {
    const response = await request(app).patch("/event/1/status/noshow").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

// report
test("post /report/volunteer/pdf", async () => {
    const response = await request(app).post("/report/volunteer/pdf").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("post /report/volunteer/csv", async () => {
    const response = await request(app).post("/report/volunteer/csv").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("post /report/event/:id/pdf", async () => {
    const response = await request(app).post("/report/event/:id/pdf").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("post /report/event/:id/csv", async () => {
    const response = await request(app).post("/report/event/:id/csv").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});

test("get /event/download", async () => {
    const response = await request(app).get("/event/download").set("Authorization", ADMIN_TOKEN);
    expect(response.statusCode).toBe(200);
});