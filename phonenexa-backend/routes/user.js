// routes/user.js
import express from 'express';
import { getUserDataFromRequest } from '../utils/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    const userData = await getUserDataFromRequest(req);
    res.json(userData);
  } catch (error) {
    res.status(401).json('no token');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, userName: 1, picture: 1, onlineStatus: 1, userType: 1, role: 1, company: 1, });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
