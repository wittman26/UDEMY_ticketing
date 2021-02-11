import nats from 'node-nats-streaming';

console.clear();

// stan is the client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// Will be executed after it is connected
stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  // Simulates the data to be emmitted
  // It has to be string due NATS does not receive JSON
  const data = JSON.stringify({
    id: '123',
    title: 'connect',
    price: 20
  });

  // Publish an event
  // subject/channel, data, actions to execute after emitted
  stan.publish('ticket:created', data, () =>{
    console.log('Event published');
  })
});


