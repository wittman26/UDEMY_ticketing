import request from 'supertest';
import { app } from '../../app';


it('your test case', () => {
    console.log('Simple test');
});

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'a@a.com',
      password: '123456',
    })
    .expect(201);
});
