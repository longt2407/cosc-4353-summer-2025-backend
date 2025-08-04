import db from "../controllers/db.js";


export const getVolunteerReport = async (key = 'volunteer_id', order = 'asc') => {
   try {
       const orderByColumn = key === 'volunteer_id' ? 'volunteer_id' : key;


       const [rows] = await db.pool.query(`
           SELECT
               v.id AS volunteer_id,
               v.email AS volunteer_email,
               v.first_name AS volunteer_first_name,
               v.middle_name AS volunteer_middle_name,
               v.last_name AS volunteer_last_name,
               COUNT(CASE WHEN ve.status = 0 THEN 1 END) AS total_assigned_event,
               COUNT(CASE WHEN ve.status = 1 THEN 1 END) AS total_participated_event,
               COUNT(CASE WHEN ve.status = 2 THEN 1 END) AS total_no_show_event
           FROM volunteer v
                    LEFT JOIN volunteer_event ve ON v.id = ve.volunteer_id
           GROUP BY v.id, v.email, v.first_name, v.middle_name, v.last_name
           ORDER BY ${orderByColumn} ${order.toUpperCase()}
       `);
       return rows;
   } catch (err) {
       console.error("Error in getVolunteerReport:", err);
       throw err;
   }
};


export const getVolunteerReportById = async (volunteerId) => {
   try {
       const [rows] = await db.pool.query(`
           SELECT
               v.id AS volunteer_id,
               v.email AS volunteer_email,
               v.first_name AS volunteer_first_name,
               v.middle_name AS volunteer_middle_name,
               v.last_name AS volunteer_last_name,
               e.id AS event_id,
               e.name AS event_name,
               e.date AS event_date,
               ve.status AS participation_type
           FROM volunteer v
                    JOIN volunteer_event ve ON v.id = ve.volunteer_id
                    JOIN event e ON ve.event_id = e.id
           WHERE v.id = ?
           ORDER BY e.date DESC
       `, [volunteerId]);
       return rows;
   } catch (err) {
       console.error("Error in getVolunteerReportById:", err);
       throw err;
   }
};
