import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }    

    await natsWrapper.connect('ticketing', 'randomstring', 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });
    // Intercepts Interrupt and terminal signals
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // mongodb://<url-mongodb>:<port>/<database-name>
    // if the database doesn't exist, it will be create id
    if (!process.env.LOCAL) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    }
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('TICKETS: Listening on port 3000');
  });
};

start();
