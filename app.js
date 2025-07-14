import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

import auth from "./helpers/auth.js";
import httpResp from "./helpers/httpResp.js";

import testController from "./controllers/test.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`server :: ${req.method} - ${req.url}`);
    next();
});

// Test
app.get("/test/echo/:message", testController.echoGet);
app.post("/test/echo/:message", testController.echoPost);
app.patch("/test/echo/:message", testController.echoPatch);
app.delete("/test/echo/:message", testController.echoDelete);
app.post("/test/auth", auth.is(auth.ADMIN, auth.VOLUNTEER), testController.auth);

// Volunteer - /volunteer/*

// Admin - /admin/*

// Event - /event/*

// Notification - /notification/*

// *
app.use(httpResp.Error[404]);

app.listen(port, () => {
    console.log(`server :: listening port ${port}`);
});
