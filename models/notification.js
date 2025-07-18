let notifData = [
    {
        id: 1,
        volunteer_id: 1,
        type: 0,
        title: "Event Assigned",
        message: "Event assigned to you.",
        status: 0,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
    {
        id: 2,
        volunteer_id: 1,
        type: 2,
        title: "Reminder",
        message: "Your shift is tomorrow.",
        status: 0,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    },
    {
        id: 3,
        volunteer_id: null,  // Global notification
        type: 1,
        title: "Site Maintenance",
        message: "The site will be down for maintenance at 10PM.",
        status: 0,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    }
];

//ID incrementing until db is developed
let nextId = notifData.length + 1;

export const getGlobalNotifs = () => notifData.filter(notif => notif.volunteer_id === null && !notif.is_deleted);
export const getNotifByVolunteerId = (volunteer_id) => notifData.filter(notif => notif.volunteer_id === volunteer_id && !notif.is_deleted || notif.volunteer_id === null);

export const markAsRead = (id) => {
    const notif = notifData.find(notif => notif.id === id);

    if(notif) {
        notif.status = 1;
        notif.updated_at = new Date();
        return notif;
    }else{
        return null;
    }
};

export const createNotif = (data) => {
    const newNotif = {
        id: nextId++,
        volunteer_id: data.volunteer_id,
        type: data.type || 0,
        title: data.title,
        message: data.message || "",
        status: 0,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    };

    notifData.push(newNotif);
    return newNotif;
}

export const deleteNotif = (id) => {
    const notif = notifData.find(notif => notif.id === id);
    if(notif) {
        notif.is_deleted = true;
        notif.deleted_at = new Date();
        return notif;
    }else{
        return null;
    }
}