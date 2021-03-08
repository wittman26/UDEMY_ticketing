import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

// stan is the client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Will be executed after it is connected
stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (error) {
    console.log(error);
  }

  // // Simulates the data to be emmitted
  // // It has to be string due NATS does not receive JSON
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'connect',
  //   price: 20
  // });

  // // Publish an event
  // // subject/channel, data, actions to execute after emitted
  // stan.publish('ticket:created', data, () =>{
  //   console.log('Event published');
  // })
});
