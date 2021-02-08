import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(201);
    
    
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'anemail@anemail.com',
      password: 'xxx',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(201);
    
    
  const response= await request(app)
    .post('/api/users/signin')
    .send({
      email: 'anemail@anemail.com',
      password: '123456',
    })
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});