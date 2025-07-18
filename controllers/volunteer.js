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

export default {
    login,
    register,
    verify
}