import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

// Control test
it('UPDATE control test', async () => {
  let x = 10;
  expect(x).toEqual(10);
});

it('returns a 404 if the provided id does not exist', async () => {
  // Buidls a valid mongoDB id
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = 'something';
  const price = 20;  

  await request(app)
  .put(`/api/tickets/${id}`)
  .set('Cookie', global.signin())
  .send({
    title,
    price,
  })
  .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  // Buidls a valid mongoDB id
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = 'something';
  const price = 20;  

  await request(app)
  .put(`/api/tickets/${id}`)
  .send({
    title,
    price,
  })
  .expect(401);    
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin()) // signin with a valid random user id
    .send({
      title: 'wier',
      price: 20,
    })
    .expect(201);
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin()) // signin with a valid random user id
    .send({
        title: 'guthias',
        price: 260,
    })
    .expect(401);     
});

it('returns a 400 if the user provide an invalid title or price', async () => {
    const cookie = global.signin(); // signin with a valid random user id
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie) 
    .send({
      title: 'wier',
      price: 20,
    });
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: '',
        price: 260,
    })
    .expect(400);
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'title',
        price: -260,
    })
    .expect(400);      
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin(); // signin with a valid random user id
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie) 
    .send({
      title: 'wier',
      price: 20,
    });
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'validtitle',
        price: 260,
    })
    .expect(200);
    
    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

    expect(ticketResponse.body.title).toEqual('validtitle');
    expect(ticketResponse.body.price).toEqual(260);
});
