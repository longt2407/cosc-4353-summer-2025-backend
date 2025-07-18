import volunteerModel from "../models/volunteer.js";
import httpResp from "../helpers/httpResp.js";
import { HttpError }  from "../helpers/error.js";
import jwt from "../helpers/jwt.js";
import volunteerVerificationModel from "../models/volunteerVerification.js";

async function login(req, res) {
    let body = req.body;
    let volunteer = await volunteerModel.getOneByEmailAndPwd(
        body.email, 
        body.password
    );
    if (volunteer) {
        volunteerModel.prepare(volunteer);
        volunteer.token = jwt.sign({
            id: volunteer.id,
            email: volunteer.email,
            role: volunteer.role
        });
    } else {
        throw new HttpError({ statusCode: 400, message: "Wrong email or password." })
    }
    return httpResp.Success[200](req, res, volunteer);
}

async function register(req, res) {
    let body = req.body;
    let verifyToken = await volunteerVerificationModel.createOne(body);
    return httpResp.Success[200](req, res, {
        token: verifyToken
    });
}

async function verify(req, res) {
    let verifyToken = req.body.token;
    let volunteerId = await volunteerModel.createOneWithToken(verifyToken);
    return httpResp.Success[200](req, res, volunteerId);
}

async function getQuestion(req, res) {
    let body = req.body;
    let volunteer = await volunteerModel.getOneByEmail(body.email);
    if (!volunteer) {
        throw new HttpError({ statusCode: 400, message: "Email is invalid." })
    }
    return httpResp.Success[200](req, res, {
        reset_password_question: volunteer.reset_password_question
    });
}

async function forget(req, res) {
    let body = req.body;
    let volunteer = await volunteerModel.getOneByEmailAndAnswer(body.email, body.reset_password_answer);
    if (!volunteer) {
        throw new HttpError({ statusCode: 400, message: "Wrong email or answer." })
    }
    let data = await volunteerModel.updatePassword(volunteer.id, body.password);
    return httpResp.Success[200](req, res, null);
}

async function updatePassword(req, res) {
    let body = req.body;
    body.id = req.jwt.user.id;
    let data = await volunteerModel.updatePassword(body.id, body.password);
    return httpResp.Success[200](req, res, null);
}

async function updateQuestionAndAnswer(req, res) {
    let body = req.body;
    body.id = req.jwt.user.id;
    let data = await volunteerModel.updateQuestionAndAnswer(body.id, body.reset_password_question, body.reset_password_answer);
    return httpResp.Success[200](req, res, null);
}

async function getProfile(req, res) {
    let volunteerId = req.jwt.user.id;
    let data = await volunteerModel.getOne(volunteerId);
    volunteerModel.prepare(data);
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