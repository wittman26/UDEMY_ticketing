import express from 'express';
import { isRegularExpressionLiteral } from 'typescript';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('Hello from signout');
});

export { router as signoutRouter };
