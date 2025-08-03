import express from 'express';
import auth from "../helpers/auth.js";
import {
    getAllNotifs,
    markAsReadNotif,
    deleteNotifById,
    createNewNotif,
    getUnreadNotifs
} from "../controllers/notification.js";

const router = express.Router();
router.use(auth.is(auth.ADMIN, auth.VOLUNTEER));

router.get('/:id/notifications', getAllNotifs);
router.post('/:id/notifications', createNewNotif);
router.put('/:id/notifications/:nid', markAsReadNotif);
router.delete('/:id/notifications/:nid', deleteNotifById);
router.get('/unread-count/:volunteer_id', getUnreadNotifs);

export default router;