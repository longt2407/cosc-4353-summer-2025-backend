import { HttpError } from "../../helpers/error.js";

test("error.HttpError 1", () => {
    let error = new HttpError({
        statusCode: 500,
        message: "Internal error."
    });
    expect(error.statusCode).toBe(500);
});

test("error.HttpError 2", () => {
    let error = new HttpError({
        message: "Internal error."
    });
    expect(error.statusCode).toBe(500);
});
