import adminModel from "../models/admin.js";
import httpResp from "../helpers/httpResp.js";
import { HttpError }  from "../helpers/error.js";
import auth from "../helpers/auth.js";
import jwt from "../helpers/jwt.js";

async function login(req, res) {
    let body = req.body;
    let admin = await adminModel.getOneByEmailAndPwd(
        body.email, 
        body.password
    );
    if (admin) {
        delete admin.password;
        delete admin.reset_password_answer;
        admin.role = auth.ADMIN;
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

export default {
    login
}