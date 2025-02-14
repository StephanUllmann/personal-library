import mongoose from 'mongoose';
import { beforeAll, afterAll } from 'vitest';
import app from '../app.js';
import { createServer } from 'http';

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'testsetup' });
  server = createServer(app);
  await new Promise((resolve) => {
    server.listen(0, () => {
      const { port } = server.address();
      process.env.TEST_PORT = port;
      resolve();
    });
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await new Promise((resolve) => server.close(resolve));
});
