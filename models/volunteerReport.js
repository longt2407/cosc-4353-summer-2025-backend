import db from "../controllers/db.js";
//Temp data until db is created
const tempData = [
    {
        volunteer_id: 1,
        volunteer_email: 'alice@example.com',
        volunteer_first_name: 'Alice',
        volunteer_middle_name: 'B.',
        volunteer_last_name: 'Smith',
        note: 'Reliable and always on time',
        total_assigned_event: 5,
        total_participated_event: 4,
        total_no_show_event: 1
    },
    {
        volunteer_id: 2,
        volunteer_email: 'bob@example.com',
        volunteer_first_name: 'Bob',
        volunteer_middle_name: '',
        volunteer_last_name: 'Jones',
        note: 'No shows often',
        total_assigned_event: 6,
        total_participated_event: 3,
        total_no_show_event: 3
    },
];

export const getMockReport = () => { return tempData;}

export const getVolunteerReportSorted = (key = 'volunteer_id', order = 'asc') => {
    return [...tempData].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if(typeof aVal === 'string' && typeof bVal === 'string') {
            return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if(typeof aVal === 'number' && typeof bVal === 'number') {
            return order === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
    });
};

export const searchVolunteerReport = (searchKey) => {
    const query = searchKey.toLowerCase();
    return tempData.filter(volunteer => `${volunteer.volunteer_first_name} ${volunteer.volunteer_middle_name} ${volunteer.volunteer_last_name}`.toLowerCase().includes(query));
};