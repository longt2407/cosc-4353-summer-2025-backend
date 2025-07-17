import utils from "../helpers/utils.js";
import auth from "../helpers/auth.js";

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

async function getOneByEmailAndPwd(email, password) {
    let data = utils.objectAssign(["email", "password"], { email, password });
    // validate email and password
    return {
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
    }
}

export default {
    prepare,
    getOneByEmailAndPwd
}