import * as volunteerReportModel from '../../models/volunteerReport.js';
import * as volunteerReportController from '../../controllers/volunteerReport.js';
import httpResp from '../../helpers/httpResp.js';

jest.mock('../../models/volunteerReport.js');

const { Success, Error } = httpResp;

describe('volunteerReport Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      setHeader: jest.fn(),
      end: jest.fn(),
      statusCode: 0,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getVolunteerReportAll', () => {
    test('returns 200 and report data on success', async () => {
      const fakeReport = [{ volunteer_id: 1, total_assigned_event: 2 }];
      volunteerReportModel.getVolunteerReport.mockResolvedValue(fakeReport);

      await volunteerReportController.getVolunteerReportAll(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('"message":"success"'));
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('"volunteer_id":1'));
    });

    test('returns 500 on model error', async () => {
      const err = new Error('DB failure');
      volunteerReportModel.getVolunteerReport.mockRejectedValue(err);  // ensure error object passed correctly

      await volunteerReportController.getVolunteerReportAll(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('"message":"Internal Server Error"'));
    });
  });

  describe('getVolunteerReportIdController', () => {
    test('returns 400 if volunteer ID invalid', async () => {
      req.params = { id: 'abc' };

      await volunteerReportController.getVolunteerReportIdController(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Bad Request'));
    });

    test('returns 400 if report not found', async () => {
      req.params = { id: '1' };
      volunteerReportModel.getVolunteerReportById.mockResolvedValue(null);

      await volunteerReportController.getVolunteerReportIdController(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Bad Request'));
    });

    test('returns 200 and report data on success', async () => {
      const fakeReport = [{ volunteer_id: 1, total_assigned_event: 3 }];
      req.params = { id: '1' };
      volunteerReportModel.getVolunteerReportById.mockResolvedValue(fakeReport);

      await volunteerReportController.getVolunteerReportIdController(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('"message":"success"'));
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('"volunteer_id":1'));
    });

    test('returns 500 on model error', async () => {
      const err = new Error('DB error');
      req.params = { id: '1' };
      volunteerReportModel.getVolunteerReportById.mockRejectedValue(err);

      await volunteerReportController.getVolunteerReportIdController(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.end).toHaveBeenCalledWith(expect.stringContaining('"Internal Server Error"'));
    });


  });
});
