import { beforeAll, beforeEach, afterAll, describe, expect, test } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import BookModel from '../models/BookModel.js';

describe('Books API', () => {
  // Test data
  const testBooks = [
    {
      title: 'Ronja Räubertocher',
      author: 'Astrid Lindgren',
      year: 1981,
      description:
        "Ronia, the Robber's Daughter is a children's fantasy book by the Swedish author Astrid Lindgren, first published in 1981.",
      isbn: '3-7891-2940-2',
      publisher: 'Oetinger',
    },
    {
      title: 'The Lord of the Rings',
      author: 'J. R. R. Tolkien',
      year: 1954,
      description:
        "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkien's 1937 children's book The Hobbit but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling books ever written, with over 150 million copies sold.",
      isbn: '9780261102385',
      publisher: 'HarperCollins',
    },
  ];
  // Setup: Insert test data
  beforeAll(async () => {
    await BookModel.insertMany(testBooks);
  });

  // Cleanup: Remove test data
  afterAll(async () => {
    await BookModel.deleteMany();
  });

  describe('GET /books', () => {
    let response;

    beforeEach(async () => {
      response = await request(app).get('/books');
    });

    test('returns 200 status code', () => {
      expect(response.status).toBe(200);
    });

    test('returns array of books', () => {
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('returns correct number of books', () => {
      expect(response.body.data.length).toBe(testBooks.length);
    });
  });
  describe('GET /books/:id', () => {
    test('returns specific book', async () => {
      // First get all books to get an id
      const allBooks = await request(app).get('/books');
      const firstBookId = allBooks.body.data[0]._id;

      const response = await request(app).get(`/books/${firstBookId}`);
      console.log({ response });
      expect(response.status).toBe(200);
      expect(response.body.data._id).toBe(firstBookId);
    });
  });
});
