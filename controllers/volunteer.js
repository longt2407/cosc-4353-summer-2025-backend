import volunteerModel from "../models/volunteer.js";
import httpResp from "../helpers/httpResp.js";
import { HttpError }  from "../helpers/error.js";
import auth from "../helpers/auth.js";
import jwt from "../helpers/jwt.js";

async function login(req, res) {
    let body = req.body;
    let volunteer = await volunteerModel.getOneByEmailAndPwd(
        body.email, 
        body.password
    );
    if (volunteer) {
        delete volunteer.password;
        delete volunteer.reset_password_answer;
        volunteer.role = auth.VOLUNTEER;
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

export default {
    login
}