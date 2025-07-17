import utils from "../helpers/utils.js";

async function getOneByEmailAndPwd(email, password) {
    let data = utils.objectAssign(["email", "password"], { email, password });
    // validate email and password
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
        skill: JSON.stringify(["communication","technology","leader"]),
        preference: null,
        availability: JSON.stringify([(new Date()).getTime(), (new Date()).getTime() + 1 * 24 * 60 * 60 * 1000]),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    }
}

export default {
    getOneByEmailAndPwd
}