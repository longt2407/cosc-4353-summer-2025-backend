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

export default {
    login,
    register,
    verify
}