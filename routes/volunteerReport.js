import express from 'express';
import {getVolunteerReport} from "../controllers/volunteerReport.js";

const router = express.Router();

router.get('/', getVolunteerReport);
router.get('/:volunteer_id', getVolunteerReport);

export default router;