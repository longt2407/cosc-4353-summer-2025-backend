import { HttpError } from "../helpers/error.js";

// import DataType from "./dataType.js";
// const validator = new Validator({
//     x: [DataType.NUMBER()],
//     y: [DataType.NUMBER(), DataType.NOTNULL()],
//     z: [
//             DataType.NUMBER({ check: (val) => { 
//                 if (val !== 0 && val !== 1) {
//                     return { error: new Error("invalid") };
//                 }
//             }}), 
//             DataType.NOTNULL()
//         ],
//     a: [DataType.STRING()],
//     b: [DataType.STRING(), DataType.NOTNULL()],
//     c: [
//             DataType.STRING({ check: (val) => {
//                 if (!/^.+@.+$/.test(val)) {
//                     return { error: new Error("invalid") };
//                 }
//             }}), 
//             DataType.NOTNULL()
//         ]
// });
// try {
//     validator.validate({ x: 1, y: 2 });
// } catch(e) {
//     ...
// }
// if (validator.check({ x: 1, y: 2 }).error) {
//     ...
// }
class Validator {
    validate(row) {
        for (let attr in this.config) {
            if (attr in row) {
                for (let dataType of this.config[attr]) {
                    let result = dataType.check(row[attr]);
                    if(result.error) {
                        throw new HttpError({ statusCode: 400, message: `${attr} is invalid.` });
                    }
                }
            }
        }
    }

    check(row) {
        for (let attr in this.config) {
            if (attr in row) {
                for (let dataType of this.config[attr]) {
                    let result = dataType.check(row[attr]);
                    if(result.error) {
                        return {
                            attr,
                            error: result.error
                        };
                    }
                }
            }
        }
        return {};
    }

    constructor(config) {
        this.config = config;
    }
}

export default Validator;