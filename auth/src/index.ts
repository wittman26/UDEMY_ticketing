import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';
const app = express();
// Added because nginx it's enrouting
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// without express-async-errors
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError());
// });

app.use(errorHandler);

const start = async () => {
  try {
    if(!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    //mongodb://<url-mongodb>:<port>/<database-name>
    // if the database doesn't exist, it will be create id
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('AUTH: Listening on port 3000');
  });
};

start();
