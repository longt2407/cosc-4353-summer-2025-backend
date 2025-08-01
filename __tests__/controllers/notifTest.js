import * as notifModel from '../../models/notification.js';
import * as notifController from '../../controllers/notification.js';

jest.mock('../../models/notification.js');

const mockResults = () => ({
    setHeader: jest.fn(),
    end: jest.fn(),
    statusCode: 0
});

test('getAllNotifications', async () => {
    const req = {
        jwt: {user: {id: 1, role: 0}}, params: {id: "1"}
    };

    const result = mockResults();

    notifModel.getNotifByVolunteerId.mockReturnValue([
        {id: 1, title: "Test 1", volunteer_id: 1}
    ]);
    notifModel.getGlobalNotifs.mockReturnValue([]);

    const { getAllNotifs } = await import('../../controllers/notification.js');
    await getAllNotifs(req, result);

    expect(result.statusCode).toBe(200);
    expect(notifModel.getNotifByVolunteerId).toHaveBeenCalledWith(1);
});

test('markAsReadNotification', async () =>{
    const updatedNotif = {id: 5, read: true};
    const req = {jwt: {user: {id:1, role: 0}}, params: {id: "5"}};

    const result = mockResults();
    notifModel.markAsRead.mockReturnValue(updatedNotif);

    await notifController.markAsReadNotif(req, result);

    expect(result.statusCode).toBe(200);
    expect(notifModel.markAsRead).toHaveBeenCalledWith(5, 1);
});

test('deleteNotification', async () =>{
    const req = {jwt: {user: {id:1, role: 0}}, params: {id: "5"}};

    const result = mockResults();

    const deleteNotif = {id: 5, volunteer_id: 1};
    notifModel.deleteNotif.mockReturnValue(deleteNotif);

    await notifController.deleteNotifById(req, result);

    expect(result.statusCode).toBe(200);
    expect(notifModel.deleteNotif).toHaveBeenCalledWith(5);
})

test('createNotification', async () =>{
    const req = {jwt: {user: {id: 1, role: 0}}, body: {volunteer_id: 1, type: 1, title: "Test", message: "Unit test"}};

    const result = mockResults();

    const newNotif = {id: 10, ...req.body};
    notifModel.createNotif.mockReturnValue(newNotif);

    await notifController.createNewNotif(req, result);

    expect(result.statusCode).toBe(200);
    expect(notifModel.createNotif).toHaveBeenCalledWith(req.body);
})