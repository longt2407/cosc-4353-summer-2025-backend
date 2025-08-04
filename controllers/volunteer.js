import { HttpError }  from "../helpers/error.js";
import jwt from "../helpers/jwt.js";
import db from "./db.js";
import volunteerModel from "../models/volunteer.js";
import volunteerVerificationModel from "../models/volunteerVerification.js";
import eventModel from "../models/event.js";
import utils from "../helpers/utils.js";
import levenshtein from "js-levenshtein";
import moment from "moment";

async function login(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteer = await volunteerModel.getOneByEmailAndPwd(
            conn, 
            body.email, 
            body.password
        );
        if (volunteer) {
            volunteerModel.prepare(volunteer);
            volunteer.token = jwt.sign({
                id: volunteer.id,
                email: volunteer.email,
                role: volunteer.role
            });
        } else {
            throw new HttpError({ statusCode: 400, message: "Wrong email or password." })
        }
        return volunteer;
    });
}

async function register(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let verifyToken = await volunteerVerificationModel.createOne(conn, body);
        return {
            token: verifyToken
        };
    });
}

async function verify(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteerId = await volunteerModel.createOneWithToken(conn, body);
        return volunteerId;
    });
}

async function getQuestion(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteer = await volunteerModel.getOneByEmail(conn, body.email);
        if (!volunteer) {
            throw new HttpError({ statusCode: 400, message: "Email is invalid." })
        }
        return {
            reset_password_question: volunteer.reset_password_question
        };
    });
}

async function forget(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        let volunteer = await volunteerModel.getOneByEmailAndAnswer(conn, body.email, body.reset_password_answer);
        if (!volunteer) {
            throw new HttpError({ statusCode: 400, message: "Wrong email or answer." })
        }
        let data = await volunteerModel.updatePassword(conn, volunteer.id, body.password);
        return null;
    });
}

async function updatePassword(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.id = req.jwt.user.id;
        let data = await volunteerModel.updatePassword(conn, body.id, body.password);
        return null;
    });
}

async function updateQuestionAndAnswer(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.id = req.jwt.user.id;
        let data = await volunteerModel.updateQuestionAndAnswer(conn, body.id, body.reset_password_question, body.reset_password_answer);
        return null;
    });
}

async function getProfile(req, res) {
    await db.tx(req, res, async (conn) => {
        let volunteerId = req.jwt.user.id;
        let data = await volunteerModel.getOne(conn, volunteerId);
        volunteerModel.prepare(data);
        return data;
    });
}

async function updateProfile(req, res) {
    await db.tx(req, res, async (conn) => {
        let body = req.body;
        body.id = req.jwt.user.id;
        let volunteerId = await volunteerModel.updateOne(conn, body);
        let volunteer = await volunteerModel.getOne(conn, volunteerId);
        volunteerModel.prepare(volunteer);
        return volunteer;
    });
}

async function getAll(req, res) {
    await db.tx(req, res, async (conn) => {
        let volunteers = await volunteerModel.getAll(conn);
        volunteerModel.prepare(volunteers);
        return volunteers;
    });
}

async function getOne(req, res) {
    await db.tx(req, res, async (conn) => {
        let [volunteerId] = utils.parseStr(req.params.id);
        let volunteer = await volunteerModel.getOne(conn, volunteerId);
        volunteerModel.prepare(volunteer);
        return volunteer;
    });
}

async function getAllAssignedByEventId(req, res) {
    await db.tx(req, res, async (conn) => {
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        let event = await eventModel.getOne(conn, eventId);
        if (event.admin_id !== adminId) {
            throw new HttpError({ statusCode: 401 });
        }
        let volunteers = await volunteerModel.getAllAssignedByEventId(conn, eventId);
        volunteerModel.prepare(volunteers);
        return volunteers;
    });
}

async function getAllMatchedByEventId(req, res) {
    await db.tx(req, res, async (conn) => {
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        let event = await eventModel.getOne(conn, eventId);
        if (event.admin_id !== adminId) {
            throw new HttpError({ statusCode: 401 });
        }
        let volunteers = await volunteerModel.getAll(conn);
        // Calculate using Levenshtein algorithm
        let calcSimilarity = (str1, str2) => {
            return 1 - levenshtein(str1, str2) / Math.max(str1.length, str2.length)
        }
        // Init matching score
        for (let v of volunteers) {
            v.matching_score = 0;
        }
        // Matching address
        let eventAddr = event.location.trim().toLowerCase();
        for (let v of volunteers) {
            let vAddr = [v.address_1, v.address_2, v.address_city, v.address_state, v.address_zip].join("").trim().toLowerCase();
            v.matching_score += calcSimilarity(vAddr, eventAddr);
        }
        // Matching availability
        for (let v of volunteers) {
            let match = v.availability.find((a) => moment(a).isSame(event.date, "day"));
            if (match) {
                v.matching_score += 1;
            }
        }
        // Matching skill
        for (let v of volunteers) {
            let count = 0;
            let cloneEventSkill = event.skill.slice();
            for (let s of v.skill) {
                let similarities = cloneEventSkill.map((es) => calcSimilarity(es.toLowerCase(), s.toLowerCase()));
                let m = Math.max(...similarities);
                if (m > 0.6) {
                    cloneEventSkill.splice(similarities.indexOf(m), 1);
                    count = count + 1;
                }
                if (count == event.skill.length) {
                    break;
                }
            }
            v.matching_score += count / event.skill.length;
        }
        return volunteers.sort((a, b) => b.matching_score - a.matching_score);
    });
}

export default {
    login,
    register,
    verify,
    getQuestion,
    forget,
    updatePassword,
    updateQuestionAndAnswer,
    getProfile,
    updateProfile,
    getAll,
    getOne,
    getAllAssignedByEventId,
    getAllMatchedByEventId
}