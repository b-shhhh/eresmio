import { getUserById, updateUser } from '../usermodel.js';
import pool from '../config/db.js';

jest.mock('../config/db.js', () => ({
    query: jest.fn(),
}));

describe('User Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch user by ID', async () => {
        const mockUserId = 1;
        const mockUser = { id: mockUserId, username: 'JohnDoe', contact_number: '1234567890', gender: 'Male' };

        pool.query.mockResolvedValue({ rows: [mockUser] });

        const result = await getUserById(mockUserId);

        expect(pool.query).toHaveBeenCalledWith(
            `SELECT id, username, contact_number, gender FROM users WHERE id = $1`, 
            [mockUserId]
        );
        expect(result).toEqual(mockUser);
    });

    test('should update user profile', async () => {
        const mockUserId = 1;
        const updatedUser = { id: mockUserId, username: 'JaneDoe', contact_number: '0987654321', gender: 'Female' };

        pool.query.mockResolvedValue({ rows: [updatedUser] });

        const result = await updateUser(mockUserId, updatedUser.username, updatedUser.contact_number, updatedUser.gender);

        expect(pool.query).toHaveBeenCalledWith(
            `UPDATE users SET username = $1, contact_number = $2, gender = $3, updated_at = NOW() 
             WHERE id = $4 RETURNING *`,
            [updatedUser.username, updatedUser.contact_number, updatedUser.gender, mockUserId]
        );
        expect(result).toEqual(updatedUser);
    });
});
