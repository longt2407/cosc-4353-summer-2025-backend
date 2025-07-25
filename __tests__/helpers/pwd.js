import pwd from "../../helpers/pwd.js";

test("pwd.hash", async () => {
    let result = await pwd.hash("123456");
    expect(typeof result).toBe("string");
});

test("pwd.hash", async () => {
    let hash = await pwd.hash("123456");
    let result = await pwd.compare("123456", hash);
    expect(result).toBe(true);
});
