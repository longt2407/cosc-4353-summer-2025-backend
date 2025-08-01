import db from "../controllers/db.js";

//export const getGlobalNotifs = async () => (await db.pool.query("SELECT * FROM notification WHERE is_deleted = false AND volunteer_id IS NULL"))[0];
export const getNotifByVolunteerId = async (volunteer_id) => {
    const [rows] = await db.pool.query("SELECT * FROM notification WHERE is_deleted = false AND volunteer_id = ?", [volunteer_id]);
    return rows;
};

export const markAsRead = async (id) => {
    await db.pool.query("UPDATE notification SET status = 1, updated_at = NOW() WHERE id = ?", [id]);
    const [rows] = await db.pool.query("SELECT * FROM notification WHERE is_deleted = false AND id = ?", [id]);

    return rows[0];
};

export const createNotif = async(data) => {
    const {
        volunteer_id,
        type = 0,
        title,
        message = "",
    } = data;

    await db.pool.query("INSERT INTO notification (volunteer_id, type, title, message, status, is_deleted, created_at, updated_at) VALUES (?, ?, ?, ?, 0, FALSE, NOW(), NOW())", [volunteer_id, type, title, message]);

    //maybe make below this instead:  const [rows] = await db.query("SELECT * FROM notification ORDER BY id DESC LIMIT 1");
    const [rows] = await db.pool.query("SELECT * FROM notification WHERE is_deleted = false AND volunteer_id = ? ORDER BY id DESC LIMIT 1", [volunteer_id]);
    return rows[0];
}

export const deleteNotif = async (id) => {
    await db.pool.query("UPDATE notification SET is_deleted = true, updated_at = NOW(), deleted_at = NOW() WHERE id = ?", [id]);

    const [rows] = await db.pool.query("SELECT * FROM notification WHERE id = ?", [id]);
    return rows[0];
}