import { beforeAll, beforeEach, afterAll, describe, expect, test } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Auth Flow', () => {
  let agent;

  const userSignupData = {
    firstName: 'Ron',
    lastName: 'Weasly',
    email: 'king@keepers.quidditch.com',
    password: '!1Qwertzuiopü',
  };

  const loginData = {
    email: 'king@keepers.quidditch.com',
    password: '!1Qwertzuiopü',
  };

  beforeAll(() => {
    agent = request.agent(app);
  });

  test('Should sign up new User', async () => {
    const res = await agent.post('/users/signup').send(userSignupData);
    expect(res.status).toBe(201);
  });

  test('Should login user and set cookie', async () => {
    const res = await agent.post('/users/login').send(loginData);
    expect(res.status).toBe(200);

    // console.log('Response Headers:', res.headers);
    // console.log('Set-Cookie Header:', res.headers['set-cookie']);

    expect(res.headers['set-cookie']).toBeDefined();
  });

  test('Should get /me info with cookie', async () => {
    const res = await agent.get('/users/me');
    expect(res.status).toBe(200);
  });

  test('Should logout by clearing cookie', async () => {
    const res = await agent.post('/users/logout');
    const cookies = res.headers['set-cookie'].toString().split('; ');
    const token = cookies.find((str) => str.startsWith('token'))?.replace('token=', '');
    expect(res.status).toBe(200);
    expect(token).toBe('');
  });

  test('Should be unauthorized after logout', async () => {
    const res = await agent.get('/users/me');
    expect(res.status).toBe(401);
  });
});
