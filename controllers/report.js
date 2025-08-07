import { HttpError }  from "../helpers/error.js";
import httpResp from "../helpers/httpResp.js";
import jwt from "../helpers/jwt.js";
import db from "./db.js";
import volunteerModel from "../models/volunteer.js";
import utils from "../helpers/utils.js";
import csvWriter from "csv-writer";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import fs from "fs";
import eventModel from "../models/event.js";

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
const DIR_REPORTS = path.resolve(DIRNAME, "../reports");

async function exportVolunteerPdf(req, res) {
    await db.tx(req, res, async (conn) => {
        let data = await volunteerModel.getReportData(conn);
        let adminId = req.jwt.user.id;
        let now = (new Date());
        let fileName = `volunteer_${adminId}_${now.getTime()}.pdf`;

        const doc = new PDFDocument({
            size: "LETTER",
            layout: "landscape",
            "margin-top": "1in",
            "margin-bottom": "1in",
            "margin-left": "1in",
            "margin-right": "1in"
        });
        doc.pipe(fs.createWriteStream(path.resolve(DIR_REPORTS, fileName)));
        doc.fontSize(10);
        doc.font("Times-Bold").text(`VOLUNTEER REPORT (${now.toISOString()})`, {
            align: "center"
        });
        doc.moveDown();
        doc.font("Times-Roman");
        doc.table({
            columnStyles: (i) => {
                if (i === 0) return { width: 30, align: { x: "center", y: "center" } };
                if (i === 4) return { width: 150, align: { y: "center" } };
                if ([5, 6, 7, 8].includes(i)) return { align: { x: "center", y: "center" } };
                return {
                    align: { y: "center" }
                }
            },
            data: [
                [
                    "ID",
                    "First Name",
                    "Middle Name",
                    "Last Name",
                    "Email",
                    "Assigned",
                    "Participated",
                    "No-Show",
                    "Total"
                ],
                ...data.map((d) => {
                    return [
                        d.id,
                        d.first_name,
                        d.middle_name,
                        d.last_name,
                        d.email,
                        d.total_assigned_event,
                        d.total_participated_event,
                        d.total_no_show_event,
                        d.total_event
                    ];
                })
            ]
        })
        doc.end();
        
        let token = jwt.sign({
            adminId,
            fileName
        });

        return token;
    });
}

async function exportVolunteerCsv(req, res) {
    await db.tx(req, res, async (conn) => {
        let data = await volunteerModel.getReportData(conn);
        let adminId = req.jwt.user.id;
        let now = (new Date());
        let fileName = `volunteer_${adminId}_${now.getTime()}.csv`;

        const writer = csvWriter.createObjectCsvWriter({
            path: path.resolve(DIR_REPORTS, fileName),
            header: [
                { id: "id", title: "ID" },
                { id: "first_name", title: "First Name" },
                { id: "middle_name", title: "Middle Name" },
                { id: "last_name", title: "Last Name" },
                { id: "email", title: "Email" },
                { id: "total_assigned_event", title: "Assigned" },
                { id: "total_participated_event", title: "Participated" },
                { id: "total_no_show_event", title: "No-Show" },
                { id: "total_event", title: "Total" }
            ]
        });
        await writer.writeRecords(data);

        let token = jwt.sign({
            adminId,
            fileName
        });

        return token;
    });
}

async function exportEventPdf(req, res) {
    await db.tx(req, res, async (conn) => {
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        let now = (new Date());
        let event = await eventModel.getOne(conn, eventId);
        if (!event) {
            throw new HttpError({ statusCode: 400 });
        }
        if (event.admin_id !== adminId) {
            throw new HttpError({ statusCode: 401 });
        }
        let fileName = `event_${adminId}_${event.id}_${now.getTime()}.pdf`;
        let volunteers = await volunteerModel.getAllAssignedByEventId(conn, event.id);
        for (let volunteer of volunteers) {
            if (volunteer.status === 0) volunteer.status = "assigned";
            if (volunteer.status === 1) volunteer.status = "participated"; 
            if (volunteer.status === 2) volunteer.status = "no-show"; 
        }
        if (event.urgency === 0) event.urgency = "low";
        if (event.urgency === 1) event.urgency = "medium";
        if (event.urgency === 2) event.urgency = "high";

        const doc = new PDFDocument({
            size: "LETTER",
            layout: "landscape",
            "margin-top": "1in",
            "margin-bottom": "1in",
            "margin-left": "1in",
            "margin-right": "1in"
        });
        doc.pipe(fs.createWriteStream(path.resolve(DIR_REPORTS, fileName)));
        doc.fontSize(10);
        doc.font("Times-Bold").text(`EVENT REPORT (${now.toISOString()})`, { align: "center" });
        doc.moveDown();
        doc.text(`Event Details`, { align: "left" });
        doc.moveDown();
        doc.font("Times-Roman");
        doc.text(`Name: ${event.name}`, { align: "left" });
        doc.text(`Location ${event.location}`, { align: "left" });
        doc.text(`Date: ${new Date(event.date).toLocaleDateString()}`, { align: "left" });
        doc.text(`Urgency: ${event.urgency }`, { align: "left" });
        doc.text(`Required Skills: ${event.skill.join(", ")}`, { align: "left" });
        doc.text(`Description: ${event.description}`, { align: "left" });
        doc.moveDown();
        doc.font("Times-Bold").text(`Assigned Volunteers`, { align: "left" });
        doc.font("Times-Roman");
        doc.moveDown();
        doc.table({
            columnStyles: (i) => {
                if (i === 0) return { width: 30, align: { x: "center", y: "center" } };
                if (i === 4) return { width: 150, align: { y: "center" } };
                if (i === 5) return { align: { x: "center", y: "center" } };
                if ([8, 9].includes(i)) return { witdh: 50, align: { x: "center", y: "center" } };
                if (i === 10) return { width: 50, align: { x: "center", y: "center" } }
                return {
                    align: { y: "center" }
                }
            },
            data: [
                [
                    "ID",
                    "First Name",
                    "Middle Name",
                    "Last Name",
                    "Email",
                    "Status",
                    "Address 1",
                    "Address 2",
                    "City",
                    "State",
                    "ZIP code"
                ],
                ...volunteers.map((v) => {
                    return [
                        v.id,
                        v.first_name,
                        v.middle_name,
                        v.last_name,
                        v.email,
                        v.status,
                        v.address_1,
                        v.address_2,
                        v.address_city,
                        v.address_state,
                        v.address_zip
                    ];
                })
            ]
        })
        doc.end();
        
        let token = jwt.sign({
            adminId,
            fileName
        });

        return token;
    });
}

async function exportEventCsv(req, res) {
    await db.tx(req, res, async (conn) => {
        let [eventId] = utils.parseStr(req.params.id);
        let adminId = req.jwt.user.id;
        let now = (new Date());
        let event = await eventModel.getOne(conn, eventId);
        if (!event) {
            throw new HttpError({ statusCode: 400 });
        }
        if (event.admin_id !== adminId) {
            throw new HttpError({ statusCode: 401 });
        }
        let fileName = `event_${adminId}_${event.id}_${now.getTime()}.pdf`;
        let volunteers = await volunteerModel.getAllAssignedByEventId(conn, event.id);
        for (let volunteer of volunteers) {
            if (volunteer.status === 0) volunteer.status = "assigned";
            if (volunteer.status === 1) volunteer.status = "participated"; 
            if (volunteer.status === 2) volunteer.status = "no-show"; 
        }

        const writer = csvWriter.createObjectCsvWriter({
            path: path.resolve(DIR_REPORTS, fileName),
            header: [
                { id: "id", title: "ID" },
                { id: "first_name", title: "First Name" },
                { id: "middle_name", title: "Middle Name" },
                { id: "last_name", title: "Last Name" },
                { id: "email", title: "Email" },
                { id: "status", title: "Status" },
                { id: "address_1", title: "Address 1" },
                { id: "address_2", title: "Address 2" },
                { id: "address_city", title: "City" },
                { id: "address_state", title: "State" },
                { id: "address_zip", title: "ZIP code" },
            ]
        });
        await writer.writeRecords(volunteers);

        let token = jwt.sign({
            adminId,
            fileName
        });

        return token;
    });
}

async function download(req, res) {
    try {
        let adminId = req.jwt.user.id;
        let token = req.query.token;
        if (!token) {
            throw new HttpError({ statusCode: 400 });
        }
        try {
            token = jwt.verify(token);
        } catch(e) {
            throw new HttpError({ statusCode: 400 });
        }
        if (!token.data.adminId || !token.data.fileName) {
            throw new HttpError({ statusCode: 400 });
        }
        if (token.data.adminId !== adminId) {
            throw new HttpError({ statusCode: 401 });
        }
        const file = path.resolve(DIR_REPORTS, token.data.fileName);
        res.download(file);
    } catch(e) {
        httpResp.Error.default(req, res, e);
    }
}

export default {
    exportVolunteerPdf,
    exportVolunteerCsv,
    exportEventPdf,
    exportEventCsv,
    download
}