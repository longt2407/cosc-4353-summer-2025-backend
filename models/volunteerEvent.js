import Validator from "../helpers/validator.js";
import DataType from "../helpers/dataType.js";

const validator = new Validator({
    id: [DataType.NUMBER(), DataType.NOTNULL()],
    event_id: [DataType.NUMBER(), DataType.NOTNULL()],
    volunteer_id: [DataType.NUMBER(), DataType.NOTNULL()],
    status: [
        DataType.NUMBER({
            check: (val) => {
                if (!(val in [0, 1, 2])) {
                    return { error: new Error("invalid") };
                }
            }
        }), 
        DataType.NOTNULL()
    ]
});

export default {
    validator
}