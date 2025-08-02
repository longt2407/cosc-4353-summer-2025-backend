import {getVolunteerReport, getVolunteerReportById} from "../models/volunteerReport.js";
import httpResp from "../helpers/httpResp.js";
const {Success, Error} = httpResp;

export const getVolunteerReportAll = async (req, res) => {
    try{
        const report = await getVolunteerReport();
        return Success[200](req, res, report);
    }catch(err){
        return Error[500](req, res, err);
    }
}

export const getVolunteerReportIdController = async (req, res) => {
    try{
        const volunteerId = parseInt(req.params.id, 10);
        if(!volunteerId) {
            return Error[400](req, res, new Error("Invalid volunteer ID"));
        }

        const report = await getVolunteerReportById(volunteerId);

        if(!report) {
            return Error[400](req, res, new Error("Volunteer report not found"));
        }

        return Success[200](req, res, report);
    }catch(err){
        return Error[500](req, res, err);
    }
}