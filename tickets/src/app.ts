import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@wagttickets/common';

const app = express();
// Added because nginx it's enrouting
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
);


app.all('*', async () => {
  throw new NotFoundError();
});

// without express-async-errors
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError());
// });

app.use(errorHandler);

export { app };
