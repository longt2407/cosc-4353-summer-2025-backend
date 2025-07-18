import express from 'express';
import auth from "../helpers/auth.js";
import {getAllNotifs, markAsReadNotif, deleteNotifById, createNewNotif} from "../controllers/notification.js";

const router = express.Router();
router.use(auth.is(auth.ADMIN, auth.VOLUNTEER));

router.get('/volunteer/:id/notification', getAllNotifs);
router.post('/volunteers/:id/notifications', createNewNotif);
router.put('/volunteers/:id/notifications/:nid', markAsReadNotif);
router.delete('/volunteers/:id/notifications/:nid', deleteNotifById);

export default router;