import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import adminModel from "./admin.js";
import pwd from "../helpers/pwd.js";
import jwt from "../helpers/jwt.js";
import { HttpError } from "../helpers/error.js";

const validator = new Validator({
    id: [DataType.NUMBER(), DataType.NOTNULL()],
    email: [
        DataType.STRING({
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
    token: [DataType.STRING(), DataType.NOTNULL()]
});

async function getOneByEmail(conn, email) {
    let data = utils.objectAssign(["email"], { email });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `admin_verification` WHERE `email` = ? AND `is_deleted` = ?',
        [data.email, false]
    );
    return rows[0] || null;
}

async function getOneByToken(conn, token) {
    let data = utils.objectAssign(["token"], { token });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `admin_verification` WHERE `token` = ? AND `is_deleted` = ?',
        [data.token, false]
    );
    return rows[0] || null;
}

async function createOne(conn, admin) {
    let data = utils.objectAssign([
        "email", 
        "password", 
        "reset_password_question", 
        "reset_password_answer"
    ], admin);
    validator.validate(data);
    let existedAdmin = await adminModel.getOneByEmail(conn, data.email);
    if (existedAdmin) {
        throw new HttpError({statusCode: 400, message: `This email is registered.`});
    }
    data.password = await pwd.hash(data.password);
    data.reset_password_answer = await pwd.hash(data.reset_password_answer)
    let adminVerification = await getOneByEmail(conn, data.email);
    let token = jwt.sign({
        email: data.email,
    });
    if (adminVerification) {
        const [rows] = await conn.query(
            'UPDATE `admin_verification` SET token = ? WHERE `id` = ? AND `is_deleted` = ?',
            [token, adminVerification.id, false]
        );
        return token;
    } else {
        const [rows] = await conn.query(
            'INSERT INTO `admin_verification`('
            + '`email`, ' 
            + '`password`, ' 
            + '`token`, ' 
            + '`reset_password_question`, ' 
            + '`reset_password_answer` '
            + ') VALUES (?, ?, ?, ?, ?)',
            [data.email, data.password, token, data.reset_password_question, data.reset_password_answer]
        );
        return token;
    }
}

async function deleteOneByToken(conn, token) {
    let data = utils.objectAssign(["token"], { token });
    validator.validate(data);
    const [rows] = await conn.query(
        'DELETE FROM `admin_verification` WHERE `token` = ?',
        [data.token]
    );
    return rows;
}

export default {
    validator,
    getOneByEmail,
    getOneByToken,
    createOne,
    deleteOneByToken
}