import { getHistoryByVolunteerId } from '../../models/volunteerHistory.js';

describe('volunteerHistory Model', () => {
  let mockConn;

  beforeEach(() => {
    mockConn = {
      query: jest.fn(),
    };
  });

  test('getHistoryByVolunteerId returns volunteer history with events', async () => {
    const volunteerId = 3;
    const fakeRows = [
      { id: 1, event_name: 'Charity Run', type: 'participated', date: '2023-07-01' },
      { id: 2, event_name: 'Food Drive', type: 'assigned', date: '2023-06-15' },
    ];

    mockConn.query.mockResolvedValue([fakeRows]);

    const result = await getHistoryByVolunteerId(mockConn, volunteerId);

    expect(mockConn.query).toHaveBeenCalledWith(expect.stringContaining('WHERE ve.volunteer_id = ?'), [volunteerId]);
    expect(result).toEqual({volunteer_id: volunteerId, events: fakeRows,});
  });

  test('getHistoryByVolunteerId throws error if query fails', async () => {
    const volunteerId = 3;
    const error = new Error('Database error');

    mockConn.query.mockRejectedValue(error);

    await expect(getHistoryByVolunteerId(mockConn, volunteerId)).rejects.toThrow(error);
  });
});
