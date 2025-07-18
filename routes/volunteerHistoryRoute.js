import express from "express";
import {getVolunteerHistory} from "../controllers/volunteerHistory.js";
import auth from "../helpers/auth.js";

const router = express.Router();
router.use(auth.is(auth.ADMIN, auth.VOLUNTEER));

router.get('/:volunteer_id', getVolunteerHistory);

export default router;