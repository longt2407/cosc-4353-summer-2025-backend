import utils from "../helpers/utils.js";

async function createOne(event) {
    let data = utils.objectAssign([
        "admin_id", 
        "name",
        "description",
        "location",
        "skill",
        "urgency",
        "date"
    ], event);
    // validate data
    // create event
    let eventId = 1;
    return eventId;
}

async function getOne(id) {
    let data = utils.objectAssign(["id"], { id });
    // validate data
    // get event
    return {
        id: 1,
        admin_id: 1,
        name: "Event A",
        descriotion: "Description of Event A",
        location: "Location A",
        skill: JSON.parse(JSON.stringify(["communication","technology","leader"])),
        urgency: 0,
        date: new Date(),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    };
}

export default {
    getOne,
    createOne
}