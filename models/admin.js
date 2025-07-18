import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import adminVerificationModel from "./adminVerification.js";
import { HttpError } from "../helpers/error.js";
import jwt from "../helpers/jwt.js";

const mockAdmin = {
    id: 1,
    email: "admin@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    first_name: "Admin",
    middle_name: null,
    last_name: "Account",
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date()
};

const validator = new Validator({
    id: [DataType.NUMBER(), DataType.NOTNULL()],
    email: [DataType.STRING({
            check: (val) => {
                if (!(/^.+@.+$/.test(val))) {
                    return { error: new Error("invalid") };
                }
            }
        }), 
        DataType.NOTNULL()
    ],
    password: [DataType.STRING(), DataType.NOTNULL()],
    reset_password_question: [DataType.STRING(), DataType.NOTNULL()],
    reset_password_answer: [DataType.STRING(), DataType.NOTNULL()],
    first_name: [DataType.STRING(), DataType.NOTNULL()],
    middle_name: [DataType.STRING()],
    last_name: [DataType.STRING(), DataType.NOTNULL()]
});

function prepare(rows) {
    const _prepare = (obj) => {
        if (obj) {
            delete obj.password;
            delete obj.reset_password_answer;
            obj.role = auth.ADMIN;
        }
    }
    if (!Array.isArray(rows)) {
        _prepare(rows);
    } else {
        for (let row of rows) {
            _prepare(row);
        }
    }
}

async function getOneByEmail(email) {
    let data = utils.objectAssign(["email"], { email });
    validator.validate(data);
    return mockAdmin;
}

async function getOneByEmailAndPwd(email, password) {
    let data = utils.objectAssign(["email", "password"], { email, password });
    validator.validate(data);
    let admin = await getOneByEmail(data.email);
    // if (admin && await pwd.compare(data.password, admin.password)) {}
    return mockAdmin;
}

async function createOneWithToken(token) {
    let data = utils.objectAssign(["token"], { token });
    adminVerificationModel.validator.validate(data);
    try {
        jwt.verify(data.token);
    } catch (e) {
        throw new HttpError({ statusCode: 400, message: `Invalid token.`});
    }
    let adminVerification = await adminVerificationModel.getOneByToken(data.token);
    if (!adminVerification) {
        throw new HttpError({ statusCode: 400, message: `Invalid token.`});
    }
    // create
    return 1;
}

export default {
    validator,
    prepare,
    getOneByEmail,
    getOneByEmailAndPwd,
    createOneWithToken
}