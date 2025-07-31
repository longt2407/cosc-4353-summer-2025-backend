import utils from "./utils.js";

class ARRAY {
    check(val) {
        if (val && !Array.isArray(val)) {
            return {
                error: new Error("invalid")
            }; 
        }
        if (val) {
            for (let v of val) {
                if(this.elementType.check(v) && this.elementType.check(v).error) {
                    return {
                        error: new Error("invalid")
                    };
                }
            }
        }
        return {};
    }

    constructor(elementType) {
        this.elementType = elementType;
    }
}

class NUMBER {
    check(val) {
        if (val && utils.isNaN(val)) {
            return {
                error: new Error("invalid")
            };
        }
        if (val && this.opt.check && this.opt.check(val) && this.opt.check(val).error) {
            return {
                error: new Error("invalid")
            };
        }
        return {};
    }

    constructor(opt = {}) {
        this.opt = utils.objectAssign(["check"], opt);
    }
}

class STRING {
    check(val) {
        if (val && typeof val !== "string") {
            return {
                error: new Error("invalid")
            };
        }
        if (val && this.opt.check && this.opt.check(val) && this.opt.check(val).error) {
            return {
                error: new Error("invalid")
            };
        }
        return {};
    }
    
    constructor(opt = {}) {
        this.opt = utils.objectAssign(["check"], opt);
    }
}

class DATETIME {
    check(val) {
        // val should be in ISO8601 format
        if (val && typeof val !== "string") {
            return {
                error: new Error("invalid")
            };
        }
        let d = new Date(val);
        if (val && !(d instanceof Date) || utils.isNaN(d.getTime())) {
            return {
                error: new Error("invalid")
            };
        }
        if (val && this.opt.check && this.opt.check(val) && this.opt.check(val).error) {
            return {
                error: new Error("invalid")
            };
        }
        return {};
    }

    constructor(opt = {}) {
        this.opt = utils.objectAssign(["check"], opt);
    }
}

class ANY {
    check(val) {
        return {};
    }
    constructor() {}
}

class NOTNULL {
    check(val) {
        if (val === null) {
            return {
                error: new Error("invalid")
            };
        }
        if (val === undefined) {
            return {
                error: new Error("invalid")
            };
        }
        if (typeof val === "string" && val.trim() === "") {
            return {
                error: new Error("invalid")
            };
        }
        if (Array.isArray(val) && val.length === 0) {
            return {
                error: new Error("invalid")
            };
        }
        return {};
    }

    constructor() {}
}

class DataType {
    static ARRAY(opt) { return new ARRAY(opt); }
    static NUMBER(opt) { return new NUMBER(opt); }
    static STRING(opt) { return new STRING(opt); }
    static DATETIME(opt) { return new DATETIME(opt); }
    static ANY(opt) { return new ANY(opt); }
    static NOTNULL(opt) { return new NOTNULL(opt); }
}

export default DataType;