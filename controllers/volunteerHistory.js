import httpResp from "../helpers/httpResp.js";
import{getHistoryByVolunteerId} from "../models/volunteerHistory.js";
import db from '../controllers/db.js';

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

        return db.tx(req, res, async (conn) => {
            const history = await getHistoryByVolunteerId(conn, volunteer_id);

            if (!history || history.events.length === 0) {
                throw new Error("No history found for volunteer");
            }

            return history;
        });
    }catch(err){
        //console.log("Caught error:", err);
        return Error[500](req, res, err);
    }
}