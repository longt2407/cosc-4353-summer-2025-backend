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
import reportController from "./controllers/report.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import volunteerRoutes from "./routes/volunteerReport.js";
import volunteerHistoryRoutes from "./routes/volunteerHistoryRoute.js";

const app = express();

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
app.get("/test/db", testController.testDB);
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

app.get("/volunteer", auth.is(auth.ADMIN), volunteerController.getAll);
app.get("/volunteer/:id", auth.is(auth.ADMIN), volunteerController.getOne);
app.get("/volunteer/event/:id/matched", auth.is(auth.ADMIN), volunteerController.getAllMatchedByEventId);
app.get("/volunteer/event/:id/assigned", auth.is(auth.ADMIN), volunteerController.getAllAssignedByEventId);

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

app.get("/admin", auth.is(auth.VOLUNTEER), adminController.getAll);
app.get("/admin/:id", auth.is(auth.VOLUNTEER), adminController.getOne);

// Event
app.get("/event", auth.is(auth.ADMIN), eventController.getAllByAdminId);
app.get("/event/:id", auth.is(auth.ADMIN), eventController.getOneByAdminId);
app.post("/event", auth.is(auth.ADMIN), eventController.createOne);
app.patch("/event/:id", auth.is(auth.ADMIN), eventController.updateOne); 
app.delete("/event/:id", auth.is(auth.ADMIN), eventController.deleteOne);
app.patch("/event/:id/assign", auth.is(auth.ADMIN), eventController.assignVolunteer)
app.patch("/event/:id/drop", auth.is(auth.ADMIN), eventController.dropVolunteer)
app.patch("/event/:id/status/participated", auth.is(auth.ADMIN), eventController.updateParticipatedStatus)
app.patch("/event/:id/status/noshow", auth.is(auth.ADMIN), eventController.updateNoShowStatus)

// Notification
app.use('/notification', notificationRoutes);
app.use('/notifications', notificationRoutes);

// Report
app.post("/report/volunteer/pdf", auth.is(auth.ADMIN), reportController.exportVolunteerPdf);
app.post("/report/volunteer/csv", auth.is(auth.ADMIN), reportController.exportVolunteerCsv);
app.post("/report/event/:id/pdf", auth.is(auth.ADMIN), reportController.exportEventPdf);
app.post("/report/event/:id/csv", auth.is(auth.ADMIN), reportController.exportEventCsv);
app.get("/report/download", reportController.download);

// *
app.use(httpResp.Error[404]);

export default app;
