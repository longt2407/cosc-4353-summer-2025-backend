import jwt from "jsonwebtoken";
const JWT_SECRET = "secret";
const data = {}

function sign() {
    // exp: 1 month
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
        data
    }, JWT_SECRET);
}

console.log(sign());