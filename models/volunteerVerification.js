import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import volunteerModel from "./volunteer.js";
import pwd from "../helpers/pwd.js";
import jwt from "../helpers/jwt.js";

const mockVolunteerVerification = {
    id: 1,
    email: "volunteer@domain.com",
    password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    reset_password_question: "1 + 1 = ?",
    reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTU0MDg3MjMsImRhdGEiOnsiZW1haWwiOiJ2b2x1bnRlZXJAZG9tYWluLmNvbSJ9LCJpYXQiOjE3NTI4MTY3MjN9.1gRuU7hRFPNnx_e5vIxJotUcGKMe49xRXpams5aHC34",
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
    token: [DataType.STRING(), DataType.NOTNULL()]
});

async function getOneByEmail(email) {
    let data = utils.objectAssign(["email"], { email });
    validator.validate(data);
    // get
    return mockVolunteerVerification;
}

async function getOneByToken(token) {
    let data = utils.objectAssign(["token"], { token });
    validator.validate(data);
    // get
    return mockVolunteerVerification;
}

async function createOne(volunteer) {
    let data = utils.objectAssign([
        "email", 
        "password", 
        "reset_password_question", 
        "reset_password_answer" 
    ], volunteer);
    validator.validate(data);
    // let existedVolunteer = await volunteerModel.getOneByEmail(data.email);
    // if (existedVolunteer) {
    //     throw new HttpError({ statusCode: 400, message: `This email is registered.`});
    // }
    data.password = await pwd.hash(data.password);
    data.reset_password_answer = await pwd.hash(data.reset_password_answer)
    let volunteerVerification = await getOneByEmail(data.email);
    let token = jwt.sign({
        email: data.email,
    });
    if (!volunteerVerification) {
        // create
    }
    if (volunteerVerification) {
        // update
    }
    return token;
}

export default {
    validator,
    getOneByEmail,
    getOneByToken,
    createOne
}