import * as reportModel from '../../models/volunteerReport.js';
import * as reportController from '../../controllers/volunteerReport.js';

describe('getVolunteerReport', () => {
  const mockReq = (id) => ({ params: { volunteer_id: id } });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('single volunteer report when volunteer_id is provided', async () => {
    const req = mockReq('1');
    const res = mockRes();

    const mockReportData = [
      { volunteer_id: 1, volunteer_first_name: 'Alice' },
      { volunteer_id: 2, volunteer_first_name: 'Bob' }
    ];

    // Mock the getMockReport() to return controlled data
    jest.spyOn(reportModel, 'getMockReport').mockReturnValue(mockReportData);

    await reportController.getVolunteerReport(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith("content-type", "application/json");
    expect(res.end).toHaveBeenCalledWith(JSON.stringify({message: "success", data: mockReportData[0],}));
  });

  it('volunteer_id is NOT provided', async () => {
    const req = { params: {} };
    const res = mockRes();

    await reportController.getVolunteerReport(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Not Found'));
  });

  it('volunteer_id no matching report found', async () => {
    const req = mockReq('99'); // id not in mock data
    const res = mockRes();

    const mockReportData = [
      { volunteer_id: 1, volunteer_first_name: 'Alice' },
      { volunteer_id: 2, volunteer_first_name: 'Bob' }
    ];

    jest.spyOn(reportModel, 'getMockReport').mockReturnValue(mockReportData);

    await reportController.getVolunteerReport(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.end).toHaveBeenCalledWith(expect.stringContaining('Not Found'));
  });
});
