import { HttpError } from "./error.js";
import jwt from "./jwt.js";
import httpResp from "./httpResp.js";

const VOLUNTEER = 0;
const ADMIN = 1;

function is(...roles) {
    return (req, res, next) => {
        try {
            let token =  (req.body && req.body.authorization) 
                || (req.headers && req.headers["authorization"]);
            if (!token) {
                throw new HttpError({ statusCode: 401 });
            }
            try {
                var { exp, iat, data } = jwt.verify(token);
            } catch (e) {
                throw new HttpError({ statusCode: 401, message: "Invalid token."});
            }
            if (roles.indexOf(data.role) > -1) {
                req.jwt = {
                    token,
                    exp,
                    iat,
                    user: data
                }
            } else {
                throw new HttpError({ statusCode: 401 });
            }
            next();
        } catch(e) {
            httpResp.Error.default(req, res, e);
        }
    }
}

export default {
    VOLUNTEER,
    ADMIN,
    is
}