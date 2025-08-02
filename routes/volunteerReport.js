import express from 'express';
import {getVolunteerReportAll, getVolunteerReportIdController} from "../controllers/volunteerReport.js";

const router = express.Router();

router.get('/', getVolunteerReportAll);
router.get('/:volunteer_id', getVolunteerReportIdController);

export default router;