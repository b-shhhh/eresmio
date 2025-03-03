import { createPost, getUserPosts } from '../postmodel.js';
import pool from '../config/db.js';

// Mock the database connection
jest.mock('../config/db.js', () => ({
    query: jest.fn(),
}));

describe('Post Model', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should create a new post', async () => {
        const mockPost = {
            title: 'Test Title',
            description: 'Test Description',
            image: 'test-image.jpg',
            userId: 1,
        };

        const mockResult = { rows: [{ id: 1, ...mockPost }] };

        pool.query.mockResolvedValue(mockResult);

        const result = await createPost(mockPost.title, mockPost.description, mockPost.image, mockPost.userId);

        expect(pool.query).toHaveBeenCalledWith(
            "INSERT INTO posts (title, description, image, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [mockPost.title, mockPost.description, mockPost.image, mockPost.userId]
        );

        expect(result).toEqual(mockResult.rows[0]);
    });

    test('should get posts for a user', async () => {
        const mockUserId = 1;
        const mockPosts = [
            { id: 1, title: 'Test 1', description: 'Desc 1', image: 'img1.jpg', user_id: mockUserId },
            { id: 2, title: 'Test 2', description: 'Desc 2', image: 'img2.jpg', user_id: mockUserId },
        ];

        pool.query.mockResolvedValue({ rows: mockPosts });

        const result = await getUserPosts(mockUserId);

        expect(pool.query).toHaveBeenCalledWith("SELECT * FROM posts WHERE user_id = $1", [mockUserId]);
        expect(result).toEqual(mockPosts);
    });
});
