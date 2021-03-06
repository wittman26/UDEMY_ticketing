import express from 'express';

// import { currentUser } from '../middlewares/current-user';
import { currentUser } from '@wagttickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.send({ currentuser: req.currentUser || null });
});

export { router as currentUserRouter };
