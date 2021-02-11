import nats, {Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// stan is the client
// second argument refers to the client id (must be unique for NATS server)
const stan = nats.connect('ticketing', randomBytes(4).toString('hex') , {
  url: 'http://localhost:4222',
});

// Will be executed after it is connected
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');
  
  // messages are the events
  subscription.on('message', (msg: Message) => {
      const data = msg.getData();

      if(typeof data === 'string') {
          console.log(`Received event #${msg.getSequence()}, with this data: ${msg.getData()}`);
      }
  });

});


