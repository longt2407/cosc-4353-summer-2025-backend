import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

import auth from "./helpers/auth.js";
import httpResp from "./helpers/httpResp.js";

import testController from "./controllers/test.js";
import volunteerController from "./controllers/volunteer.js";
import adminController from "./controllers/admin.js";
import eventController from "./controllers/event.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import volunteerRoutes from "./routes/volunteerReport.js";
import volunteerHistoryRoutes from "./routes/volunteerHistoryRoute.js";

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

// Volunteer
app.use("/volunteer/report/", volunteerRoutes);
app.use("/volunteer/history/", volunteerHistoryRoutes);

app.post("/volunteer/login", volunteerController.login);
app.post("/volunteer/register", volunteerController.register);
app.post("/volunteer/verify", volunteerController.verify);
app.post("/volunteer/forget/question", volunteerController.getQuestion);
app.post("/volunteer/forget", volunteerController.forget);
app.patch("/volunteer/password", auth.is(auth.VOLUNTEER), volunteerController.updatePassword);
app.patch("/volunteer/qa", auth.is(auth.VOLUNTEER), volunteerController.updateQuestionAndAnswer);
app.get("/volunteer/profile", auth.is(auth.VOLUNTEER), volunteerController.getProfile);
app.patch("/volunteer/profile", auth.is(auth.VOLUNTEER), volunteerController.updateProfile);

// Admin
app.post("/admin/login", adminController.login);
app.post("/admin/register", adminController.register);
app.post("/admin/verify", adminController.verify);
app.post("/admin/forget/question", adminController.getQuestion);
app.post("/admin/forget", adminController.forget);
app.patch("/admin/password", auth.is(auth.ADMIN), adminController.updatePassword);
app.patch("/admin/qa", auth.is(auth.ADMIN), adminController.updateQuestionAndAnswer);
app.get("/admin/profile", auth.is(auth.ADMIN), adminController.getProfile);
app.patch("/admin/profile", auth.is(auth.ADMIN), adminController.updateProfile);

// Event
app.get("/event", auth.is(auth.ADMIN), eventController.getAllByAdminId);
app.post("/event", auth.is(auth.ADMIN), eventController.createOne);

// Notification
app.use('/notification', notificationRoutes);

// *
app.use(httpResp.Error[404]);

app.listen(port, () => {
    console.log(`server :: listening port ${port}`);
});
