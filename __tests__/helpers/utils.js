import utils from "../../helpers/utils.js";
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

test("utils.objectAssign", () => {
    let obj = utils.objectAssign(
        ["x", "y", "z", "t", "s"], 
        { x : 1 }, { y : 2 }, { z: "" }, { t: undefined }, { s: null }
    );
    expect(obj).toEqual({
        x: 1,
        y: 2,
        z: null,
        t: null,
        s: null
    });
});

test("utils.timeout", () => {
    utils.timeout(100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
});

test("utils.parseStr 1", () => {
    const [val, e] = utils.parseStr(3);
    expect(val).toBe(3);
});

test("utils.parseStr 2", () => {
    const [val, e] = utils.parseStr("3");
    expect(val).toBe(3);
});

test("utils.parseStr 3", () => {
    const [val, e] = utils.parseStr("str");
    expect(val).toBe("str");
});

test("utils.parseStr 4", () => {
    const [val, e] = utils.parseStr('"str"');
    expect(val).toBe("str");
});

test("utils.parseStr 5", () => {
    const [val, e] = utils.parseStr({});
    expect(val).toEqual({});
});

test("utils.isNaN", () => {
    expect(utils.isNaN("3")).toBe(true);
});