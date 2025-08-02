import * as notifModel from '../../models/notification.js';
import db from '../../controllers/db.js';

jest.mock('../../controllers/db.js');

db.pool = {
  query: jest.fn()
};

describe('Notification Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getNotifByVolunteerId returns rows', async () => {
    const fakeRows = [{ id: 1, volunteer_id: 1, title: 'Test' }];
    db.pool.query.mockResolvedValue([fakeRows]);

    const result = await notifModel.getNotifByVolunteerId(1);
    expect(db.pool.query).toHaveBeenCalledWith(
      'SELECT * FROM notification WHERE is_deleted = false AND volunteer_id = ?',
      [1]
    );
    expect(result).toEqual(fakeRows);
  });

  test('markAsRead updates and returns updated row', async () => {
    const updatedRow = { id: 2, status: 1 };
    // First call: UPDATE
    db.pool.query.mockResolvedValueOnce([{}]);
    // Second call: SELECT to get updated row
    db.pool.query.mockResolvedValueOnce([[updatedRow]]);

    const result = await notifModel.markAsRead(2);
    expect(db.pool.query).toHaveBeenNthCalledWith(1,
      'UPDATE notification SET status = 1 WHERE id = ?',
      [2]
    );
    expect(db.pool.query).toHaveBeenNthCalledWith(2,
      'SELECT * FROM notification WHERE is_deleted = false AND id = ?',
      [2]
    );
    expect(result).toEqual(updatedRow);
  });

  test('createNotif inserts and returns latest notification', async () => {
    const newNotif = { id: 3, volunteer_id: 1, type: 0, title: 'Hi', message: 'Msg' };
    db.pool.query.mockResolvedValueOnce([{}]); // for INSERT
    db.pool.query.mockResolvedValueOnce([[newNotif]]); // for SELECT

    const result = await notifModel.createNotif({
      volunteer_id: 1,
      type: 0,
      title: 'Hi',
      message: 'Msg'
    });

    expect(db.pool.query).toHaveBeenNthCalledWith(1,
      'INSERT INTO notification (volunteer_id, type, title, message, status, is_deleted, created_at, updated_at) VALUES (?, ?, ?, ?, 0, FALSE, NOW(), NOW())',
      [1, 0, 'Hi', 'Msg']
    );

    expect(db.pool.query).toHaveBeenNthCalledWith(2,
      'SELECT * FROM notification WHERE is_deleted = false AND volunteer_id = ? ORDER BY id DESC LIMIT 1',
      [1]
    );

    expect(result).toEqual(newNotif);
  });

  test('deleteNotif marks notification as deleted and returns the row', async () => {
    const deletedNotif = { id: 4, is_deleted: true };
    db.pool.query.mockResolvedValueOnce([{}]); // for UPDATE
    db.pool.query.mockResolvedValueOnce([[deletedNotif]]); // for SELECT

    const result = await notifModel.deleteNotif(4);

    expect(db.pool.query).toHaveBeenNthCalledWith(1,
      'UPDATE notification SET is_deleted = true, deleted_at = NOW() WHERE id = ?',
      [4]
    );

    expect(db.pool.query).toHaveBeenNthCalledWith(2,
      'SELECT * FROM notification WHERE id = ?',
      [4]
    );

    expect(result).toEqual(deletedNotif);
  });

  test('handles empty results gracefully', async () => {
    // markAsRead returns undefined if no rows
    db.pool.query.mockResolvedValueOnce([{}]);
    db.pool.query.mockResolvedValueOnce([[]]); // empty result set

    const result = await notifModel.markAsRead(999);
    expect(result).toBeUndefined();
  });
});