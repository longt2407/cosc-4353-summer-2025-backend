import * as notifModel from '../../models/notification.js';
import * as notifController from '../../controllers/notification.js';

jest.mock('../../models/notification.js');

const mockResults = () => {
    const res = {};
    res.statusCode = 0;
    res.setHeader = jest.fn();
    res.end = jest.fn();
    return res;
};

describe('Notification Controller', () => {
    test('getAllNotifications - success', async () => {
        const req = {
            jwt: {user: {id: 1, role: 0}}, params: {id: "1"}
        };

        const res = mockResults();

        notifModel.getNotifByVolunteerId.mockReturnValue([
            {id: 1, title: "Test 1", volunteer_id: 1}
        ]);
        //notifModel.getGlobalNotifs.mockReturnValue([]); global will be implemented later..

        await notifController.getAllNotifs(req, res);

        expect(res.statusCode).toBe(200);
        expect(notifModel.getNotifByVolunteerId).toHaveBeenCalledWith(1);
    });

    test('getAllNotifs - unauthorized', async () => {
        const req = {jwt: { user: { id: 2, role: 0 } }, params: { id: "1" }};

        const res = mockResults();

        await notifController.getAllNotifs(req, res);

        await notifController.getAllNotifs(req, res);

        expect(res.statusCode).toBe(401);
        expect(res.setHeader).toHaveBeenCalledWith("content-type", "application/json");
        expect(res.end).toHaveBeenCalledWith(expect.stringContaining("Unauthorized"));
    });

    test('markAsReadNotification', async () => {
        const updatedNotif = {id: 5, read: true};
        const req = {jwt: {user: {id: 1, role: 0}}, params: {nid: "5"}};

        const result = mockResults();
        notifModel.markAsRead.mockReturnValue(updatedNotif);

        await notifController.markAsReadNotif(req, result);

        expect(result.statusCode).toBe(200);
        expect(notifModel.markAsRead).toHaveBeenCalledWith(5, 1);
    });

    test('deleteNotification', async () => {
        const req = {jwt: {user: {id: 1, role: 0}}, params: {nid: "5"}};

        const result = mockResults();

        const deleteNotif = {id: 5, volunteer_id: 1};
        notifModel.deleteNotif.mockReturnValue(deleteNotif);

        await notifController.deleteNotifById(req, result);

        expect(result.statusCode).toBe(200);
        expect(notifModel.deleteNotif).toHaveBeenCalledWith(5);
    })

    test('createNotification', async () => {
        const req = {
            jwt: {user: {id: 1, role: 0}},
            body: {volunteer_id: 1, type: 1, title: "Test", message: "Unit test"}
        };

        const result = mockResults();

        const newNotif = {id: 10, ...req.body};
        notifModel.createNotif.mockReturnValue(newNotif);

        await notifController.createNewNotif(req, result);

        expect(result.statusCode).toBe(200);
        expect(notifModel.createNotif).toHaveBeenCalledWith(req.body);
    })

    test('markAsReadNotification - invalid id param', async () => {
      const req = { jwt: { user: { id: 1, role: 0 } }, params: { id: "abc" } };
      const res = mockResults();

      await notifController.markAsReadNotif(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining("Bad Request"));
    });

    test('deleteNotification - invalid id param', async () => {
      const req = { jwt: { user: { id: 1, role: 0 } }, params: { id: "abc" } };
      const res = mockResults();

      await notifController.deleteNotifById(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining("Bad Request"));
    });

    test('getAllNotifs - authorized as admin (role 1)', async () => {
        const req = { jwt: { user: { id: 99, role: 1 } }, params: { id: '5' } };
        const res = mockResults();

        notifModel.getNotifByVolunteerId.mockResolvedValue([]);

        await notifController.getAllNotifs(req, res);

        expect(res.statusCode).toBe(200);
        expect(notifModel.getNotifByVolunteerId).toHaveBeenCalledWith(5);
    });

    test('markAsReadNotif - notif not found returns 404 error', async () => {
        const req = { jwt: { user: { id: 1, role: 0 } }, params: { nid: '10' } };
        const res = mockResults();

        notifModel.markAsRead.mockReturnValue(null);

        await notifController.markAsReadNotif(req, res);

        expect(res.statusCode).toBe(404);
        expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Not Found'));
    });

    test('deleteNotifById - unauthorized deletion returns 400 error', async () => {
        const req = { jwt: { user: { id: 2, role: 0 } }, params: { nid: '15' } };
        const res = mockResults();

        notifModel.deleteNotif.mockResolvedValue({ id: 15, volunteer_id: 1 });

        await notifController.deleteNotifById(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Bad Request'));
    });


    test('createNewNotif - missing fields returns 400 error', async () => {
        const req = {jwt: { user: { id: 1, role: 0 } }, body: { volunteer_id: 1, type: 1, title: '' }};
        const res = mockResults();

        await notifController.createNewNotif(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Bad Request'));
    });
});