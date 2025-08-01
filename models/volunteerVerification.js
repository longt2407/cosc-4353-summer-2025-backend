import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import volunteerModel from "./volunteer.js";
import pwd from "../helpers/pwd.js";
import jwt from "../helpers/jwt.js";

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
        'SELECT * FROM `volunteer_verification` WHERE `email` = ? AND `is_deleted` = ?',
        [data.email, false]
    );
    return rows[0] || null;
}

async function getOneByToken(conn, token) {
    let data = utils.objectAssign(["token"], { token });
    validator.validate(data);
    const [rows] = await conn.query(
        'SELECT * FROM `volunteer_verification` WHERE `token` = ? AND `is_deleted` = ?',
        [data.token, false]
    );
    return rows[0] || null;
}

async function createOne(conn, volunteer) {
    let data = utils.objectAssign([
        "email", 
        "password", 
        "reset_password_question", 
        "reset_password_answer" 
    ], volunteer);
    validator.validate(data);
    let existedVolunteer = await volunteerModel.getOneByEmail(conn, data.email);
    if (existedVolunteer) {
        throw new HttpError({ statusCode: 400, message: `This email is registered.`});
    }
    data.password = await pwd.hash(data.password);
    data.reset_password_answer = await pwd.hash(data.reset_password_answer)
    let volunteerVerification = await getOneByEmail(conn, data.email);
    let token = jwt.sign({
        email: data.email,
    });
    if (volunteerVerification) {
        const [rows] = await conn.query(
            'UPDATE `volunteer_verification` SET '
            + '`password` = ?, ' 
            + '`token` = ?, '
            + '`reset_password_question` = ?, '
            + '`reset_password_answer` = ?, '
            + 'WHERE `id` = ? AND `is_deleted` = ?',
            [
                data.password,
                token,
                data.reset_password_question,
                data.reset_password_answer,
                volunteerVerification.id, 
                false
            ]
        );
        return token;
    } else {
        const [rows] = await conn.query(
            'INSERT INTO `volunteer_verification`('
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
        'DELETE FROM `volunteer_verification` WHERE `token` = ?',
        [data.token]
    );
    return null;
}

export default {
    validator,
    getOneByEmail,
    getOneByToken,
    createOne,
    deleteOneByToken
}