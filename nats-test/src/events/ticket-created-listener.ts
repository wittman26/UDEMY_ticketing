import { Message, Stan } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects} from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated; //Name of the channel
  queueGroupName = 'payments-service'; // consistent value to join to other services

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    //Here goes all the business logic
    console.log('Event data!', data);

    msg.ack();
  }
}
