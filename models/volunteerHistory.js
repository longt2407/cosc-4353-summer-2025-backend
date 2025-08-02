import db from '../controllers/db.js';
export const getHistoryByVolunteerId = async (conn, volunteer_id) => {
   const [rows] = await conn.query(`
       SELECT
           vh.id,
           e.name AS event_name,
           vh.type,
           vh.date
       FROM volunteer_history vh
       JOIN event e ON vh.event_id = e.id
       WHERE vh.volunteer_id = ?
       ORDER BY vh.date DESC
   `, [volunteer_id]);


   return {
       volunteer_id: parseInt(volunteer_id),
       events: rows
   };
};



