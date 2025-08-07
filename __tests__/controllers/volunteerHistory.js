jest.mock('../../models/volunteerHistory.js');

jest.mock('../../controllers/db.js', () => ({
  __esModule: true,
  default: {
    tx: jest.fn()
  }
}));

import * as volunteerHistoryModel from '../../models/volunteerHistory.js';
import db from '../../controllers/db.js';
import * as volunteerHistoryController from '../../controllers/volunteerHistory.js';
import httpResp from '../../helpers/httpResp.js';


describe('volunteerHistory Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = { params: {} };
      res = {
        statusCode: 0,
        setHeader: jest.fn(),
        end: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  });

  test('getVolunteerHistory - success', async () => {

    const fakeResult = { volunteer_id: 1, events: [{ id: 5, event_name: 'Test Event' }] };
    const req = { params: { volunteer_id: '1' } };
    req.params.volunteer_id = '1';
    const res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    db.tx.mockImplementation(async (req, res, cb) => {return await cb({});});

    volunteerHistoryModel.getHistoryByVolunteerId.mockResolvedValue(fakeResult);
    const spySuccess200 = jest.spyOn(httpResp.Success, '200');
    //console.log("Before calling getVolunteerHistory");
    await volunteerHistoryController.getVolunteerHistory(req, res);
    //console.log("db.tx calls:", db.tx.mock.calls.length);

    expect(db.tx).toHaveBeenCalled();
    expect(volunteerHistoryModel.getHistoryByVolunteerId).toHaveBeenCalledWith({}, '1');
    // expect(spySuccess200).toHaveBeenCalledWith(req, res, fakeResult);
    spySuccess200.mockRestore();
  });

  test('getVolunteerHistory - missing volunteer_id returns 400 error', async () => {
    const req = { params: {} };
    const res = {
      setHeader: jest.fn(),
      end: jest.fn(),
      statusCode: 0,
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await volunteerHistoryController.getVolunteerHistory(req, res);
    expect(res.statusCode).toBe(400);
  });

  test('getVolunteerHistory - tx throws error returns 500', async () => {
    req.params.volunteer_id = '1';

    const testError = new Error('DB Transaction Failed');
    db.tx.mockImplementation(() => { throw testError; });

    const spyError500 = jest.spyOn(httpResp.Error, '500');

    await volunteerHistoryController.getVolunteerHistory(req, res);

    expect(db.tx).toHaveBeenCalled();
    expect(spyError500).toHaveBeenCalledWith(req, res, testError);

    spyError500.mockRestore();
  });
});
