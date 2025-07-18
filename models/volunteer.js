import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";
import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";

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

async function getOneByEmail(email) {
    let data = utils.objectAssign(["email"], { email });
    validator.validate(data);
    return {
        id: 1,
        email: "volunteer@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Peter",
        middle_name: null,
        last_name: "Parker",
        address_1: "123 Street Dr",
        address_2: null,
        address_city: "Star",
        address_state: "TX",
        address_zip: "70000",
        skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
        preference: null,
        availability: JSON.parse(JSON.stringify([(new Date()).getTime(), (new Date()).getTime() + 1 * 24 * 60 * 60 * 1000])),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    };
}

async function getOneByEmailAndPwd(email, password) {
    let data = utils.objectAssign(["email", "password"], { email, password });
    validator.validate(data);
    let volunteer = await getOneByEmail(data.email);
    // if (volunteer && await pwd.compare(data.password, volunteer.password)) {}
    return {
        id: 1,
        email: "volunteer@domain.com",
        password: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        reset_password_question: "1 + 1 = ?",
        reset_password_answer: "$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa", // 123456
        first_name: "Peter",
        middle_name: null,
        last_name: "Parker",
        address_1: "123 Street Dr",
        address_2: null,
        address_city: "Star",
        address_state: "TX",
        address_zip: "70000",
        skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
        preference: null,
        availability: JSON.parse(JSON.stringify([(new Date()).getTime(), (new Date()).getTime() + 1 * 24 * 60 * 60 * 1000])),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    }
}

export default {
    prepare,
    getOneByEmail,
    getOneByEmailAndPwd
}