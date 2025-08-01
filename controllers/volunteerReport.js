import {getMockReport} from "../models/volunteerReport.js";
import httpResp from "../helpers/httpResp.js";
const {Success, Error} = httpResp;

export const getVolunteerReport = async (req, res) => {
    const {volunteer_id} = req.params;
    const reportData = getMockReport();

    if(volunteer_id) {
        const report = reportData.find(volunteer => volunteer.volunteer_id === parseInt(volunteer_id, 10));
        if(!report){
            return Error[404](req, res, new Error("Volunteer report not found"));
        }
        return Success[200](req, res, report);
    }else{
        return Error[404](req, res, new Error("No Volunteer_id"));
    }
}