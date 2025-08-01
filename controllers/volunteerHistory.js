import httpResp from "../helpers/httpResp.js";
import{getHistoryByVolunteerId} from "../models/volunteerHistory.js";

const {Success, Error} = httpResp;

export const getVolunteerHistory = async (req, res) => {
    try{
        const {volunteer_id} = req.params;
        //console.log("volunteer_id:", volunteer_id);
        //console.log("history found:", history);

        if (!volunteer_id) {
            //console.log("Missing volunteer_id");
            return Error[400](req, res, new Error("Volunteer ID is required"));
        }

        const history = await getHistoryByVolunteerId(volunteer_id);

        if(!history) {
            //console.log("Volunteer history not found");
            return Error[400](req, res, new Error("Volunteer ID is required"));
        }
        //console.log("Returning events:", history.events);
        return res.status(200).json({message: "success", data: history,});
    }catch(err){
        //console.log("Caught error:", err);
        return Error[500](req, res, err);
    }
}