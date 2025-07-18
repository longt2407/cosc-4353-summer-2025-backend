const tempData = [
    {
        volunteer_id: 1,
        events: [
            { id: 101, event_name: "Beach Cleanup", type: "assigned", date: "2025-05-01" },
            { id: 102, event_name: "Food Drive", type: "participated", date: "2025-06-10" },
            { id: 103, event_name: "Park Restoration", type: "no-show", date: "2025-06-25" }
        ]
    },
    {
        volunteer_id: 2,
        events: [
            { id: 104, event_name: "Toy Drive", type: "assigned", date: "2025-06-15" }
        ]
    }
];

// Mock function to get volunteer history
export const getHistoryByVolunteerId = (volunteer_id) => {
    return tempData.find(v => v.volunteer_id === parseInt(volunteer_id));
};