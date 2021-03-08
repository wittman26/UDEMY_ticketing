import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// stan is the client
// second argument refers to the client id (must be unique for NATS server)
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});
// console.log('Inside');
// Will be executed after it is connected
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  // On close will do this
  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();

  //NEEDED ONLY WITHOUT THE ABSTRACT CLASS
  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true) // Set manual check event ok
  //   .setDeliverAllAvailable() // Send all messages available again
  //   .setDurableName('ticcket-service'); // Sets a Durable id to handle processes events
  
  // // subject/channel, queue group, options
  // const subscription = stan.subscribe(
  //   'ticket:created',
  //   'orders-service-queue-group',
  //   options
  // );

  // // messages are the events
  // subscription.on('message', (msg: Message) => {
  //   const data = msg.getData();

  //   if (typeof data === 'string') {
  //     console.log(
  //       `Received event #${msg.getSequence()}, with this data: ${msg.getData()}`
  //     );
  //   }

  //   // Send event ok to NATS
  //   msg.ack();
  // });
});

// Intercepts Interrupt and terminal signals
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan; //Stan, that's how the community calls NATS client
  protected ackWait = 5 * 1000; // 5000 miliseconds

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}


class TicketCreatedListener extends Listener {
  subject = 'ticket:created'; //Name of the channel
  queueGroupName = 'payments-service'; // consistent value to join to other services
  
  onMessage(data: any, msg: nats.Message): void {
    //Here goes all the business logic
    console.log('Event data!', data);

    msg.ack();
  }
  
}