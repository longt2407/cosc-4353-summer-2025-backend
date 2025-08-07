import httpResp from "../../helpers/httpResp.js";

async function exportVolunteerPdf(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function exportVolunteerCsv(req, res) {

    return httpResp.Success[200](req, res, {});
}

async function exportEventPdf(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function exportEventCsv(req, res) {
    return httpResp.Success[200](req, res, {});
}

async function download(req, res) {
    return httpResp.Success[200](req, res, {});
}

export default {
    ...jest.requireActual("../report.js").default,
    exportVolunteerPdf,
    exportVolunteerCsv,
    exportEventPdf,
    exportEventCsv,
    download
}