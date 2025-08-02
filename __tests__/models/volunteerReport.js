import * as volunteerReport from '../../models/volunteerReport.js';
import db from '../../controllers/db.js';

// Mock db.pool.query function
db.pool = {
  query: jest.fn(),
};

describe('volunteerReport Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getVolunteerReport returns rows sorted by volunteer_id ascending by default', async () => {
    const fakeRows = [
      { volunteer_id: 1, volunteer_email: 'a@x.com' },
      { volunteer_id: 2, volunteer_email: 'b@y.com' },
    ];
    db.pool.query.mockResolvedValue([fakeRows]);

    const result = await volunteerReport.getVolunteerReport();
    expect(db.pool.query).toHaveBeenCalledWith(expect.stringContaining('ORDER BY volunteer_id ASC'));
    expect(result).toEqual(fakeRows);
  });

  test('getVolunteerReport sorts by custom key and order', async () => {
    const fakeRows = [];
    db.pool.query.mockResolvedValue([fakeRows]);

    await volunteerReport.getVolunteerReport('last_name', 'desc');
    expect(db.pool.query).toHaveBeenCalledWith(expect.stringContaining('ORDER BY last_name DESC'));
  });

  test('getVolunteerReport throws and logs error on failure', async () => {
    const error = new Error('DB failure');
    db.pool.query.mockRejectedValue(error);
    console.error = jest.fn();

    await expect(volunteerReport.getVolunteerReport()).rejects.toThrow(error);
    expect(console.error).toHaveBeenCalledWith('Error in getVolunteerReport:', error);
  });

  test('getVolunteerReportById returns rows for given volunteerId', async () => {
    const fakeRows = [
      {
        volunteer_id: 1,
        volunteer_email: 'a@x.com',
        event_id: 5,
        event_name: 'Charity',
        participation_type: 'participated',
        event_date: '2023-01-01',
      },
    ];
    db.pool.query.mockResolvedValue([fakeRows]);

    const volunteerId = 1;
    const result = await volunteerReport.getVolunteerReportById(volunteerId);
    expect(db.pool.query).toHaveBeenCalledWith(expect.stringContaining('WHERE v.id = ?'), [volunteerId]);
    expect(result).toEqual(fakeRows);
  });

  test('getVolunteerReportById throws and logs error on failure', async () => {
    const error = new Error('DB failure');
    db.pool.query.mockRejectedValue(error);
    console.error = jest.fn();

    await expect(volunteerReport.getVolunteerReportById(1)).rejects.toThrow(error);
    expect(console.error).toHaveBeenCalledWith('Error in getVolunteerReportById:', error);
  });
});
