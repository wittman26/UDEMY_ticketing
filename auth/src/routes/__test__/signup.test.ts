import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(201);
});

it('return a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalid',
      password: '123456',
    })
    .expect(400);  
});

it('return a 400 with an invalid email and password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalid',
      password: '1',
    })
    .expect(400);  
});

it('return a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);    
});


it('disallows a duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(201);
    
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'anemail@anemail.com',
      password: 'zzzz',
    })
    .expect(400);     
});

it('sets a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(201);
    
  // pulls out the cookie inside the response.
  expect(response.get('Set-Cookie')).toBeDefined();    
});