import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

// Control test
it('INDEX tests again', async () => {
  let x = 10;
  expect(x).toEqual(10);
});

const createTicket = () => {
  const title = 'something';
  const price = 20;
  return request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title,
    price,
  });
};

it('can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
  .get('/api/tickets')
  .send()
  .expect(200);

  expect(response.body.length).toEqual(3);
});
