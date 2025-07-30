import db from "./db.js";
import httpResp from "../helpers/httpResp.js";

function echoGet(req, res) {
    httpResp.Success[200](req, res, {
        query: {...req.query},
        params: {... req.params}
    });
}

function echoPost(req, res) {
    return httpResp.Success[200](req, res, {
        params: {... req.params},
        body: {...req.body}
    });
}

function echoPatch(req, res) {
    return httpResp.Success[200](req, res, {
        params: {... req.params},
        body: {...req.body}
    });
}

function echoDelete(req, res) {
    return httpResp.Success[200](req, res, {
        params: {... req.params},
        body: {...req.body}
    });
}

async function testDB(req, res) {
    try {
        var conn = await db.pool.getConnection();
        await conn.beginTransaction();
        await conn.commit();
        httpResp.Success[200](req, res, {
            message: "success"
        });
    } catch(e) {
        conn && await conn.rollback();
        httpResp.Success[200](req, res, {
            message: `error - ${e.message}`
        });
    } finally {
        conn && conn.release();
    }
}

function auth(req, res) {
    return httpResp.Success[200](req, res, req.jwt);
}

export default {
    echoGet,
    echoPost,
    echoPatch,
    echoDelete,
    testDB,
    auth
}