import express from 'express';
import { isRegularExpressionLiteral } from 'typescript';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hello from currentuser');
});

export { router as currentUserRouter };
