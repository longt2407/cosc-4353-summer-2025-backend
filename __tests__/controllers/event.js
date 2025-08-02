import eventController from "../../controllers/event.js";

jest.mock('../../controllers/db.js');
jest.mock('../../models/event.js');
jest.mock('../../models/volunteerEvent.js');

// getAllByAdminId
test("eventController.getAllByAdminId", async () => {
    let req = {
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.getAllByAdminId(req, res);
    expect(res.statusCode).toBe(200);
});


// createOne
test("eventController.createOne", async () => {
    let req = {
        body: {},
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.createOne(req, res);
    expect(res.statusCode).toBe(200);
});

// updateOne
test("eventController.updateOne", async () => {
    let req = {
        body: {},
        params: {
            id: 1
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.updateOne(req, res);
    expect(res.statusCode).toBe(200);
});

// deleteOne
test("eventController.deleteOne", async () => {
    let req = {
        body: {},
        params: {
            id: 1
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.deleteOne(req, res);
    expect(res.statusCode).toBe(200);
});

// assignVolunteer
test("eventController.assignVolunteer", async () => {
    let req = {
        body: {
            volunteer_id: 1
        },
        params: {
            id: 1
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.assignVolunteer(req, res);
    expect(res.statusCode).toBe(200);
});

// dropVolunteer
test("eventController.dropVolunteer", async () => {
    let req = {
        body: {
            volunteer_id: 1
        },
        params: {
            id: 1
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.dropVolunteer(req, res);
    expect(res.statusCode).toBe(200);
});

// getOneByAdminId
test("eventController.getOneByAdminId", async () => {
    let req = {
        body: {},
        params: {},
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.getOneByAdminId(req, res);
    expect(res.statusCode).toBe(200);
});

// updateParticipatedStatus
test("eventController.updateParticipatedStatus", async () => {
    let req = {
        body: {
            volunteer_id: 1
        },
        params: {
            id: 1
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.updateParticipatedStatus(req, res);
    expect(res.statusCode).toBe(200);
});

// updateNoShowStatus
test("eventController.updateNoShowStatus", async () => {
    let req = {
        body: {
            volunteer_id: 1
        },
        params: {
            id: 1
        },
        jwt: {
            user: {
                id: 1
            }
        }
    };
    let res = {
        setHeader: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    let data = await eventController.updateNoShowStatus(req, res);
    expect(res.statusCode).toBe(200);
});