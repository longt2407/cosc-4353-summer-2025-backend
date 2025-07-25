import jwt from "jsonwebtoken";
const JWT_SECRET = "secret";

function sign(data) {
    // exp: 1 month
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
        data
    }, JWT_SECRET);
}

function verify(token) {
    return jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true
    });
}

export default {
    sign,
    verify
}