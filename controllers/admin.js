import { HttpError }  from "../helpers/error.js";
import jwt from "../helpers/jwt.js";
import db from "./db.js";
import adminModel from "../models/admin.js";
import adminVerificationModel from "../models/adminVerification.js";

async function login(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let admin = await adminModel.getOneByEmailAndPwd(
            conn,
            body.email, 
            body.password
        );
        if (admin) {
            adminModel.prepare(admin);
            admin.token = jwt.sign({
                id: admin.id,
                email: admin.email,
                role: admin.role
            });
        } else {
            throw new HttpError({ statusCode: 400, message: "Wrong email or password." })
        }
        return admin
    });
}

async function register(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let verifyToken = await adminVerificationModel.createOne(conn, body);
        return {
            token: verifyToken
        };
    });
}

async function verify(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let adminId = await adminModel.createOneWithToken(conn, body);
        return adminId;
    });
}

async function getQuestion(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let admin = await adminModel.getOneByEmail(conn, body.email);
        if (!admin) {
            throw new HttpError({ statusCode: 400, message: "Email is invalid." })
        }
        return {
            reset_password_question: admin.reset_password_question
        };
    });
}

async function forget(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let admin = await adminModel.getOneByEmailAndAnswer(conn, body.email, body.reset_password_answer);
        if (!admin) {
            throw new HttpError({ statusCode: 400, message: "Wrong email or answer." })
        }
        let data = await adminModel.updatePassword(conn, admin.id, body.password);
        return null;
    });
}

async function updatePassword(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.id = req.jwt.user.id;
        let data = await adminModel.updatePassword(conn, body.id, body.password);
        return null;
    });
}

async function updateQuestionAndAnswer(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.id = req.jwt.user.id;
        let data = await adminModel.updateQuestionAndAnswer(conn, body.id, body.reset_password_question, body.reset_password_answer);
        return null;
    });
}

async function getProfile(req, res) {
    await db.tx(req, res, async (conn) => {
        let adminId = req.jwt.user.id;
        let data = await adminModel.getOne(conn, adminId);
        adminModel.prepare(data);
        return data;
    });
}

async function updateProfile(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.id = req.jwt.user.id;
        let adminId = await adminModel.updateOne(conn, body);
        let admin = await adminModel.getOne(conn, adminId);
        adminModel.prepare(admin);
        return admin;
    });
}

export default {
    login,
    register,
    verify,
    getQuestion,
    forget,
    updatePassword,
    updateQuestionAndAnswer,
    getProfile,
    updateProfile
}