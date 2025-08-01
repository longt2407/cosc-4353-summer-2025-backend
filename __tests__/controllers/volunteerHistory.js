jest.mock('../../models/volunteerHistory', () => ({getHistoryByVolunteerId: jest.fn()}));

import * as historyModel from '../../models/volunteerHistory';
import * as historyController from '../../controllers/volunteerHistory';

describe('getVolunteerHistory', () => {
    const mockReq = (id) => ({ params: { volunteer_id: id } });

    const mockRes = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.setHeader = jest.fn();
        res.end = jest.fn();
        return res;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('vaild history', async () => {
        const req = mockReq(1);
        const res = mockRes();

        const mockHistory = {
            volunteer_id: 1,
            events: [{ type: 'assigned', eventId: 101 }]
        };

        historyModel.getHistoryByVolunteerId.mockReturnValue(mockHistory);

        await historyController.getVolunteerHistory(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: "success", data: mockHistory,});
    });

    it('volunteer_id missing', async () => {
        const req = mockReq(undefined);
        const res = mockRes();

        await historyController.getVolunteerHistory(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({ message: "Bad Request", data: null }));
    });


});