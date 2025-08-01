import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import volunteerVerificationModel from "./volunteerVerification.js";
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
    last_name: [DataType.STRING(), DataType.NOTNULL()], 
    address_1: [DataType.STRING(), DataType.NOTNULL()],
    address_2: [DataType.STRING()],
    address_city: [DataType.STRING(), DataType.NOTNULL()],
    address_state: [
        DataType.STRING({
            check: (val) => {
                if (val.length !== 2) {
                    return { error: new Error("invalid") };
                }
            }
        }), 
        DataType.NOTNULL()
    ],
    address_zip:[
        DataType.STRING({
            check: (val) => {
                if (!(/^\d{5}(?:[-\s]\d{4})?$/).test(val)) {
                    return { error: new Error("invalid") };
                }
            }
        }), 
        DataType.NOTNULL()
    ],
    skill: [DataType.ARRAY(DataType.STRING()), DataType.NOTNULL()],
    preference: [DataType.STRING()],
    availability: [DataType.ARRAY(DataType.DATETIME()), DataType.NOTNULL()]
});

function prepare(rows) {
    const _prepare = (obj) => {
        if (obj) {
            delete obj.password;
            delete obj.reset_password_question;
            delete obj.reset_password_answer;
            obj.role = auth.VOLUNTEER;
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

function parse(rows) {
    const _parse = (obj) => {
        if (obj) {
            if (obj.skill) {
                obj.skill = JSON.parse(obj.skill);
            }
            if (obj.availability) {
                obj.availability = JSON.parse(obj.availability);
            }
        }
    }
    if (!Array.isArray(rows)) {
        _parse(rows);
    } else {
        for (let row of rows) {
            _parse(row);
        }
    }
}

function stringify(rows) {
    const _stringify = (obj) => {
        if (obj) {
            if (obj.skill) {
                obj.skill = JSON.stringify(obj.skill);
            }
            if (obj.availability) {
                obj.availability = JSON.stringify(obj.availability);
            }
        }
    }
    if (!Array.isArray(rows)) {
        _stringify(rows);
    } else {
        for (let row of rows) {
            _stringify(row);
        }
    }
}

async function getOneByEmail(conn, email) {
    let data = utils.objectAssign(["email"], { email });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `volunteer` WHERE `email` = ? AND `is_deleted` = ?',
        [data.email, false]
    );
    parse(rows);
    return rows[0] || null;
}

async function getOneByEmailAndPwd(conn, email, password) {
    let data = utils.objectAssign(["email", "password"], { email, password });
    validator.validate(data);
    let volunteer = await getOneByEmail(conn, data.email);
    if (volunteer && await pwd.compare(data.password, volunteer.password)) {
        return volunteer;
    }
    return null;
}

async function createOneWithToken(conn, volunteer) {
    let data = utils.objectAssign([
        "token",
        "first_name",
        "middle_name",
        "last_name",
        "address_1",
        "address_2",
        "address_city",
        "address_state",
        "address_zip",
        "skill",
        "preference",
        "availability"
    ], volunteer);
    volunteerVerificationModel.validator.validate(data);
    validator.validate(data);
    try {
        jwt.verify(data.token);
    } catch (e) {
        throw new HttpError({ statusCode: 400, message: `Invalid token.`});
    }
    let volunteerVerification = await volunteerVerificationModel.getOneByToken(conn, data.token);
    if (!volunteerVerification) {
        throw new HttpError({ statusCode: 400, message: `Invalid token.`});
    }
    let existedVolunteer = await getOneByEmail(conn, volunteerVerification.email);
    if (existedVolunteer) {
        throw new HttpError({ statusCode: 400, message: `This email is registered.` });
    }
    stringify(data);
    const [rows] = await conn.query(
        'INSERT INTO `volunteer`('
        + '`email`, '
        + '`password`, '
        + '`reset_password_question`, '
        + '`reset_password_answer`, '
        + '`first_name`, '
        + '`middle_name`, '
        + '`last_name`, '
        + '`address_1`, '
        + '`address_2`, '
        + '`address_city`, '
        + '`address_state`, '
        + '`address_zip`, '
        + '`skill`, '
        + '`preference`, '
        + '`availability` '
        + ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            volunteerVerification.email, 
            volunteerVerification.password, 
            volunteerVerification.reset_password_question, 
            volunteerVerification.reset_password_answer,
            data.first_name,
            data.middle_name,
            data.last_name,
            data.address_1,
            data.address_2,
            data.address_city,
            data.address_state,
            data.address_zip,
            data.skill,
            data.preference,
            data.availability
        ]
    );
    await volunteerVerificationModel.deleteOneByToken(conn, data.token);
    return rows.insertId;
}

async function getOne(conn, id) {
    let data = utils.objectAssign(["id"], { id });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `volunteer` WHERE `id` = ? AND `is_deleted` = ?',
        [data.id, false]
    );
    parse(rows);
    return rows[0] || null;
}

async function getOneByEmailAndAnswer(conn, email, answer) {
    let data = utils.objectAssign(["email", "answer"], { email, answer });
    validator.validate(data);
    let volunteer = await getOneByEmail(conn, data.email);
    if (volunteer && await pwd.compare(answer, volunteer.reset_password_answer)) {
        return volunteer;
    }
    return null;
}

async function updatePassword(conn, id, password) {
    let data = utils.objectAssign(["id", "password"], { id, password });
    validator.validate(data);
    let volunteer = await getOne(conn, data.id);
    if (!volunteer) {
        throw new HttpError({statusCode: 400, message: `Volunteer not found.`});
    }
    data.password = await pwd.hash(data.password);
    const [rows] = await conn.query(
        'UPDATE `volunteer` SET password = ? WHERE `id` = ? AND `is_deleted` = ?',
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
        'UPDATE `volunteer` SET `reset_password_question` = ?, `reset_password_answer` = ? WHERE `id` = ? AND `is_deleted` = ?',
        [data.reset_password_question, data.reset_password_answer, data.id, false]
    );
    return data.id;
}

async function updateOne(conn, newVolunteer) {
    let oldVolunteer = await getOne(conn, newVolunteer.id);
    if (!oldVolunteer) {
        throw new HttpError({statusCode: 400, message: `Volunteer not found.`});
    }
    let data = utils.objectAssign(
        [
            "id", 
            "first_name",
            "middle_name",
            "last_name",
            "address_1",
            "address_2",
            "address_city",
            "address_state",
            "address_zip",
            "skill",
            "preference",
            "availability"
        ], 
        oldVolunteer, 
        newVolunteer
    );
    validator.validate(data);
    stringify(data);
    const [rows] = await conn.query(
        'UPDATE `volunteer` SET'
        + '`first_name` = ?, '
        + '`middle_name` = ?, '
        + '`last_name` = ?, '
        + '`address_1` = ?, '
        + '`address_2` = ?, '
        + '`address_city` = ?, '
        + '`address_state` = ?, '
        + '`address_zip` = ?, '
        + '`skill` = ?, '
        + '`preference` = ?, '
        + '`availability` = ? '
        + 'WHERE `id` = ? AND `is_deleted` = ?',
        [
            data.first_name,
            data.middle_name,
            data.last_name,
            data.address_1,
            data.address_2,
            data.address_city,
            data.address_state,
            data.address_zip,
            data.skill,
            data.preference,
            data.availability,
            data.id,
            false
        ]
    );
    return data.id;
}

export default {
    validator,
    prepare,
    parse,
    stringify,
    getOneByEmail,
    getOneByEmailAndPwd,
    createOneWithToken,
    getOne,
    getOneByEmailAndAnswer,
    updatePassword,
    updateQuestionAndAnswer,
    updateOne
}