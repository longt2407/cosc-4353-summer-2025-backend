import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import adminVerificationModel from "./adminVerification.js";
import { HttpError } from "../helpers/error.js";
import jwt from "../helpers/jwt.js";
import pwd from "../helpers/pwd.js";

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
    first_name: [DataType.STRING(), DataType.NOTNULL()],
    middle_name: [DataType.STRING()],
    last_name: [DataType.STRING(), DataType.NOTNULL()]
});

function prepare(rows) {
    const _prepare = (obj) => {
        if (obj) {
            delete obj.password;
            delete obj.reset_password_question;
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

async function getOneByEmail(conn, email) {
    let data = utils.objectAssign(["email"], { email });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `admin` WHERE `email` = ? AND `is_deleted` = ?',
        [data.email, false]
    );
    return rows[0] || null;
}

async function getOneByEmailAndPwd(conn, email, password) {
    let data = utils.objectAssign(["email", "password"], { email, password });
    validator.validate(data);
    let admin = await getOneByEmail(conn, data.email);
    if (admin && await pwd.compare(data.password, admin.password)) {
        return admin;
    }
    return null;
}

async function createOneWithToken(conn, admin) {
    let data = utils.objectAssign([
        "token",
        "first_name",
        "middle_name",
        "last_name"
    ], admin);
    adminVerificationModel.validator.validate(data);
    validator.validate(data);
    try {
        jwt.verify(data.token);
    } catch (e) {
        throw new HttpError({ statusCode: 400, message: `Invalid token.`});
    }
    let adminVerification = await adminVerificationModel.getOneByToken(conn, data.token);
    if (!adminVerification) {
        throw new HttpError({ statusCode: 400, message: `Invalid token.`});
    }
    let existedAdmin = await getOneByEmail(conn, adminVerification.email);
    if (existedAdmin) {
        throw new HttpError({ statusCode: 400, message: `This email is registered.` });
    }
    const [rows] = await conn.query(
        'INSERT INTO `admin`('
        + '`email`, '
        + '`password`, '
        + '`reset_password_question`, '
        + '`reset_password_answer`, '
        + '`first_name`, '
        + '`middle_name`, '
        + '`last_name` '
        + ') VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            adminVerification.email, 
            adminVerification.password, 
            adminVerification.reset_password_question, 
            adminVerification.reset_password_answer,
            data.first_name,
            data.middle_name,
            data.last_name
        ]
    );
    await adminVerificationModel.deleteOneByToken(conn, data.token);
    return rows.insertId;
}

async function getOne(conn, id) {
    let data = utils.objectAssign(["id"], { id });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `admin` WHERE `id` = ? AND `is_deleted` = ?',
        [data.id, false]
    );
    return rows[0] || null;
}

async function getOneByEmailAndAnswer(conn, email, answer) {
    let data = utils.objectAssign(["email", "answer"], { email, answer });
    validator.validate(data);
    let admin = await getOneByEmail(conn, data.email);
    if (admin && await pwd.compare(answer, admin.reset_password_answer)) {
        return admin;
    }
    return null;
}

async function updatePassword(conn, id, password) {
    let data = utils.objectAssign(["id", "password"], { id, password });
    validator.validate(data);
    let admin = await getOne(conn, data.id);
    if (!admin) {
        throw new HttpError({ statusCode: 400, message: `Admin not found.` });
    }
    data.password = await pwd.hash(data.password);
    const [rows] = await conn.query(
        'UPDATE `admin` SET password = ? WHERE `id` = ? AND `is_deleted` = ?',
        [data.password, data.id, false]
    );
    return data.id;
}

async function updateQuestionAndAnswer(conn, id, reset_password_question, reset_password_answer) {
    let data = utils.objectAssign([
        "id", 
        "reset_password_question", 
        "reset_password_answer"
    ], { 
        id, 
        reset_password_question, 
        reset_password_answer 
    });
    validator.validate(data);
    data.reset_password_answer = await pwd.hash(data.reset_password_answer);
    const [rows] = await conn.query(
        'UPDATE `admin` SET `reset_password_question` = ?, `reset_password_answer` = ? WHERE `id` = ? AND `is_deleted` = ?',
        [data.reset_password_question, data.reset_password_answer, data.id, false]
    );
    return data.id;
}

async function updateOne(conn, newAdmin) {
    let oldAdmin = await getOne(conn, newAdmin.id);
    if (!oldAdmin) {
        throw new HttpError({statusCode: 400, message: `Admin not found.`});
    }
    let data = utils.objectAssign(
        [
            "id", 
            "first_name",
            "middle_name",
            "last_name",
        ], 
        oldAdmin, 
        newAdmin
    );
    validator.validate(data);
    const [rows] = await conn.query(
        'UPDATE `admin` SET'
        + '`first_name` = ?, '
        + '`middle_name` = ?, '
        + '`last_name` = ? '
        + 'WHERE `id` = ? AND `is_deleted` = ?',
        [
            data.first_name,
            data.middle_name,
            data.last_name,
            data.id,
            false
        ]
    );
    return data.id;
}

async function getAll(conn) {
    const [rows] = await conn.query(
        'SELECT * FROM `admin` WHERE `is_deleted` = ?',
        [false]
    );
    return rows;
}

export default {
    validator,
    prepare,
    getOneByEmail,
    getOneByEmailAndPwd,
    createOneWithToken,
    getOne,
    getOneByEmailAndAnswer,
    updatePassword,
    updateQuestionAndAnswer,
    updateOne,
    getAll
}