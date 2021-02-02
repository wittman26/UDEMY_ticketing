import express from 'express';
import { isRegularExpressionLiteral } from 'typescript';

const router = express.Router();

router.post('/api/users/currentuser', (req, res) => {
  res.send('Hello from currentuser');
});

export { router as signinRouter };
