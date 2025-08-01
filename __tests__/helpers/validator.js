import DataType from "../../helpers/dataType.js";
import Validator from "../../helpers/validator.js";
import { HttpError } from "../../helpers/error.js";

// validate
test("validator.validate 1", () => {
    const validator = new Validator({
        x: [DataType.NUMBER()]
    });
    expect(() => { 
        return validator.validate({
            x: 1
        });
    }).not.toThrow(HttpError);
});

test("validator.validate 2", () => {
    const validator = new Validator({
        x: [DataType.NUMBER()]
    });
    expect(() => { 
        return validator.validate({
            y: 1
        });
    }).not.toThrow(HttpError);
});

test("validator.validate - error", () => {
    const validator = new Validator({
        x: [DataType.NUMBER()]
    });
    expect(() => { 
        return validator.validate({
            x: "str"
        });
    }).toThrow(HttpError);
});

// check
test("validator.check 1", () => {
    const validator = new Validator({
        x: [DataType.NUMBER()]
    });
    let result = validator.check({
        x: 1
    });
    expect(result.error).toBe(undefined);
});

test("validator.check 2", () => {
    const validator = new Validator({
        x: [DataType.NUMBER()]
    });
    let result = validator.check({
        y: 1
    });
    expect(result.error).toBe(undefined);
});

test("validator.check - error", () => {
    const validator = new Validator({
        x: [DataType.NUMBER()]
    });
    let result = validator.check({
        x: "str"
    });
    expect(result.error).not.toBe(undefined);
});
