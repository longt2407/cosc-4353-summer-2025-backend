import DataType from "../../helpers/dataType.js";

test("dataType.ARRAY 1", () => {
    let validator = DataType.ARRAY(DataType.NUMBER());
    let result = validator.check([1, 2]);
    expect(result.error).toBe(undefined);
});

test("dataType.ARRAY 2", () => {
    let validator = DataType.ARRAY(DataType.NUMBER());
    let result = validator.check(null);
    expect(result.error).toBe(undefined);
});

test("dataType.ARRAY 3", () => {
    let validator = DataType.ARRAY(DataType.NUMBER({
        check: (val) => {
            if (val !== 1) {
                return {
                    error: new Error("invalid")
                };
            }
        }
    }));
    let result = validator.check([1, 1]);
    expect(result.error).toBe(undefined);
});

test("dataType.ARRAY - error 1", () => {
    let validator = DataType.ARRAY(DataType.NUMBER());
    let result = validator.check("1, 2");
    expect(result.error).not.toBe(undefined);
});

test("dataType.ARRAY - error 2", () => {
    let validator = DataType.ARRAY(DataType.NUMBER({
        check: (val) => {
            if (val !== 1) {
                return {
                    error: new Error("invalid")
                };
            }
        }
    }));
    let result = validator.check([1, 2]);
    expect(result.error).not.toBe(undefined);
});

test("dataType.NUMBER 1", () => {
    let validator = DataType.NUMBER();
    let result = validator.check(1);
    expect(result.error).toBe(undefined);
});

test("dataType.NUMBER 2", () => {
    let validator = DataType.NUMBER({
        check: (val) => {
            if (val !== 1) {
                return {
                    error: new Error("invalid")
                };
            }
        }
    });
    let result = validator.check(1);
    expect(result.error).toBe(undefined);
});

test("dataType.NUMBER - error 1", () => {
    let validator = DataType.NUMBER();
    let result = validator.check("str");
    expect(result.error).not.toBe(undefined);
});

test("dataType.NUMBER - error 2", () => {
    let validator = DataType.NUMBER({
        check: (val) => {
            if (val !== 1) {
                return {
                    error: new Error("invalid")
                };
            }
        }
    });
    let result = validator.check(2);
    expect(result.error).not.toBe(undefined);
});

test("dataType.STRING 1", () => {
    let validator = DataType.STRING();
    let result = validator.check("str");
    expect(result.error).toBe(undefined);
});

test("dataType.STRING 2", () => {
    let validator = DataType.STRING({
        check: (val) => {
            if (val !== "str") {
                return {
                    error: new Error("invalid")
                };
            }
        }
    });
    let result = validator.check("str");
    expect(result.error).toBe(undefined);
});

test("dataType.STRING - error 1", () => {
    let validator = DataType.STRING();
    let result = validator.check(1);
    expect(result.error).not.toBe(undefined);
});

test("dataType.STRING - error 2", () => {
    let validator = DataType.STRING({
        check: (val) => {
            if (val !== "str") {
                return {
                    error: new Error("invalid")
                };
            }
        }
    });
    let result = validator.check("abc");
    expect(result.error).not.toBe(undefined);
});

test("dataType.DATETIME 1", () => {
    let today = (new Date()).getTime();
    let validator = DataType.DATETIME();
    let result = validator.check(today);
    expect(result.error).toBe(undefined);
});

test("dataType.DATETIME 2", () => {
    let today = (new Date()).getTime();
    let validator = DataType.DATETIME({
        check: (val) => {
            if (val !== today) {
                return {
                    error: new Error("invalid")
                };
            }
        }
    });
    let result = validator.check(today);
    expect(result.error).toBe(undefined);
});

test("dataType.DATETIME - error", () => {
    let today = (new Date()).getTime();
    let validator = DataType.DATETIME();
    let result = validator.check(today.toString());
    expect(result.error).not.toBe(undefined);
});

test("dataType.DATETIME - error 2", () => {
    let today = (new Date()).getTime();
    let validator = DataType.DATETIME({
        check: (val) => {
            if (val !== today) {
                return {
                    error: new Error("invalid")
                };
            }
        }
    });
    let result = validator.check(today + 1);
    expect(result.error).not.toBe(undefined);
});

test("dataType.ANY", () => {
    let validator = DataType.ANY();
    let result = validator.check("abc");
    expect(result.error).toBe(undefined);
});

test("dataType.NOTNULL", () => {
    let validator = DataType.NOTNULL();
    let result = validator.check("abc");
    expect(result.error).toBe(undefined);
});

test("dataType.NOTNULL - error 1", () => {
    let validator = DataType.NOTNULL();
    let result = validator.check(null);
    expect(result.error).not.toBe(undefined);
});

test("dataType.NOTNULL - error 2", () => {
    let validator = DataType.NOTNULL();
    let result = validator.check(undefined);
    expect(result.error).not.toBe(undefined);
});

test("dataType.NOTNULL - error 3", () => {
    let validator = DataType.NOTNULL();
    let result = validator.check("");
    expect(result.error).not.toBe(undefined);
});

test("dataType.NOTNULL - error 4", () => {
    let validator = DataType.NOTNULL();
    let result = validator.check([]);
    expect(result.error).not.toBe(undefined);
});
