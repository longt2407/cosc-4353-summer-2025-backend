async function assignVolunteer(conn, eventId, volunteerId, adminId) { 
    return null;
}

async function dropVolunteer(conn, eventId, volunteerId, adminId) {
    return null;
}

export default {
    ...jest.requireActual("../volunteerEvent.js").default,
    assignVolunteer,
    dropVolunteer
}