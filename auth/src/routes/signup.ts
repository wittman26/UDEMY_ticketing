import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.get('/api/users/signup/health', (req: Request, res: Response) => {
  res.status(200).send({ status: 'OK', message: 'Signup health Ok' });
});

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email is in use');
    }

    const user = User.build({ email, password });
    await user.save();
    console.log('JWT is...');
    console.log('This value: ' + process.env.JWT_KEY);
    // Generate JWT
    const userjwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userjwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
