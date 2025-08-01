import mysql from 'mysql2/promise';
import httpResp from "../../helpers/httpResp.js";

let config = {};

const pool = {};

async function tx(req, res, func) {
    try {
        let data = await func({});
        httpResp.Success[200](req, res, data);
    } catch(e) {
        httpResp.Error.default(req, res, e);
    }
}

export default {
    ...jest.requireActual("../db.js").default,
    config,
    pool,
    tx
};