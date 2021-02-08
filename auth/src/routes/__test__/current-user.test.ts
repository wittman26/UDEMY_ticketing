import request from 'supertest';
import { app } from '../../app';

it('reponds with details about the current user', async () => {
    // Obtains the cookie by calling the global function signin in setup.ts
    const cookie = await global.signin();
  
    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie) //Set a header
      .send()
      .expect(200);
  
    console.log('Body Content: ' + JSON.stringify(response.body));
    expect(response.body.currentuser.email).toEqual('anemail@anemail.com')
  });

  it('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);

    expect(response.body.currentuser).toEqual(null);
  });