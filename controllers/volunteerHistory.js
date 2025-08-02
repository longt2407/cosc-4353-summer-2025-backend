import httpResp from "../helpers/httpResp.js";
import{getHistoryByVolunteerId} from "../models/volunteerHistory.js";
import db from "./db.js";


const {tx} = db;
const {Success, Error} = httpResp;


export const getVolunteerHistory = async (req, res) => {
   try{
       const {volunteer_id} = req.params;
       //console.log("volunteer_id:", volunteer_id);
       //console.log("history found:", history);


       if (!volunteer_id) {
           //console.log("Missing volunteer_id");
           return httpResp.Error[400](req, res, new Error("Volunteer ID is required"));
       }


       return tx(req, res, async (conn) => {return await getHistoryByVolunteerId(conn, volunteer_id);});
   }catch(err){
       //console.log("Caught error:", err);
       return Error[500](req, res, err);
   }
}

