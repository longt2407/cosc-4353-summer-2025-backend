import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";
import adminModel from "./admin.js";
import pwd from "../helpers/pwd.js";
import jwt from "../helpers/jwt.js";

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
    return {
        id: 1,
        email: "admin@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    };
}

async function createOne(admin) {
    let data = utils.objectAssign([
        "email", 
        "password", 
        "reset_password_question", 
        "reset_password_answer"
    ], admin);
    validator.validate(data);
    // let existedAdmin = await adminModel.getOneByEmail(data.email);
    // if (existedAdmin) {
    //     throw new HttpError({statusCode: 400, message: `This email is registered.`});
    // }
    data.password = await pwd.hash(data.password);
    data.reset_password_answer = await pwd.hash(data.reset_password_answer)
    let adminVerification = await getOneByEmail(data.email);
    if (!adminVerification) {
        let token = jwt.sign({
            email: data.email,
        });
        // create
        // nodemailer
    }
    if (adminVerification) {
        let token = adminVerification.token;
        try {
            jwt.verify(token);
        } catch (e) {
            token = jwt.sign({
                email: data.email,
            });
            // update
        }
        // nodemailer
    }
    return 1;
}

export default {
    getOneByEmail,
    createOne
}