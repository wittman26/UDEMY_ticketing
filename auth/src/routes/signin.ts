import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@wagttickets/common';
import { User } from '../models/user';
import { Password } from '../services/password';

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // 1. Validate existing email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // 2. Validate password supplied against stored
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // 3. Return JWT
    // Generate JWT
    const userjwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userjwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
