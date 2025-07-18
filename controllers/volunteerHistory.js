import httpResp from "../helpers/httpResp.js";
import{getHistoryByVolunteerId} from "../models/volunteerHistory.js";

const {Success, Error} = httpResp;

export const getVolunteerHistory = async (req, res) => {
    try{
        const {volunteer_id} = req.params;
        const volunteer = getHistoryByVolunteerId(volunteer_id);

        if(!volunteer_id) {
            return Error[400](req, res, new Error("Volunteer ID is required"));
        }
        if(!volunteer) {
            return Error[404](req, res, new Error("Volunteer not found"));
        }

        return Success[200](req, res, volunteer);
    }catch(err){
        return Error[500](req, res, err);
    }
}