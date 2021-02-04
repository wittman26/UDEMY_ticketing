import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.get('/api/users/signin/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'OK', message: 'Signin Ok' });
});

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    console.log('It arrives: ' + req.body);
    console.log('It JWT: ' + process.env.JWT_KEY);

    res.status(201).send(req.body);
  }
);

export { router as signinRouter };
