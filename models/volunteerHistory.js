import db from '../controllers/db.js';

export const getHistoryByVolunteerId = async (conn, volunteer_id) => {
   //console.log('Fetching history for volunteer_id:', volunteer_id);
    const [rows] = await conn.query(`
        SELECT ve.id, e.name AS event_name, ve.status AS type, e.date, e.location, a.email AS admin_email
        FROM volunteer_event ve
        JOIN event e ON ve.event_id = e.id
        JOIN admin a ON e.admin_id = a.id
        WHERE ve.volunteer_id = ? AND ve.is_deleted = 0
        ORDER BY e.date DESC
    `, [volunteer_id]);

  return {
    volunteer_id: parseInt(volunteer_id),
    events: rows
  };
};



