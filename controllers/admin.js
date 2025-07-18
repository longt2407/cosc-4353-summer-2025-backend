import adminModel from "../models/admin.js";
import httpResp from "../helpers/httpResp.js";
import { HttpError }  from "../helpers/error.js";
import jwt from "../helpers/jwt.js";
import adminVerificationModel from "../models/adminVerification.js";

async function login(req, res) {
    let body = req.body;
    let admin = await adminModel.getOneByEmailAndPwd(
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
    return httpResp.Success[200](req, res, admin);
}

async function register(req, res) {
    let body = req.body;
    let verifyToken = await adminVerificationModel.createOne(body);
    return httpResp.Success[200](req, res, {
        token: verifyToken
    });
}

async function verify(req, res) {
    let verifyToken = req.body.token;
    let adminId = await adminModel.createOneWithToken(verifyToken);
    return httpResp.Success[200](req, res, adminId);
}

async function getQuestion(req, res) {
    let body = req.body;
    let admin = await adminModel.getOneByEmail(body.email);
    if (!admin) {
        throw new HttpError({ statusCode: 400, message: "Email is invalid." })
    }
    return httpResp.Success[200](req, res, {
        reset_password_question: admin.reset_password_question
    });
}

async function forget(req, res) {
    let body = req.body;
    let admin = await adminModel.getOneByEmailAndAnswer(body.email, body.reset_password_answer);
    if (!admin) {
        throw new HttpError({ statusCode: 400, message: "Wrong email or answer." })
    }
    let data = await adminModel.updatePassword(admin.id, body.password);
    return httpResp.Success[200](req, res, null);
}

async function updatePassword(req, res) {
    let body = req.body;
    body.id = req.jwt.user.id;
    let data = await adminModel.updatePassword(body.id, body.password);
    return httpResp.Success[200](req, res, null);
}

async function updateQuestionAndAnswer(req, res) {
    let body = req.body;
    body.id = req.jwt.user.id;
    let data = await adminModel.updateQuestionAndAnswer(body.id, body.reset_password_question, body.reset_password_answer);
    return httpResp.Success[200](req, res, null);
}

async function getProfile(req, res) {
    let adminId = req.jwt.user.id;
    let data = await adminModel.getOne(adminId);
    adminModel.prepare(data);
    return httpResp.Success[200](req, res, data);
}

async function updateProfile(req, res) {
    return httpResp.Success[200](req, res, null);
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