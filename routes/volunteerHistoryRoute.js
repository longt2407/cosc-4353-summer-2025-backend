import express from "express";
import {getVolunteerHistory} from "../controllers/volunteerHistory.js";

const router = express.Router();
router.get('/:volunteer_id', getVolunteerHistory);

export default router;