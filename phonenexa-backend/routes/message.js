// routes/message.js
import express from 'express';
import { getUserDataFromRequest } from '../utils/auth.js';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { userId: ourUserId } = await getUserDataFromRequest(req);
    const messages = await Message.find({
      sender: { $in: [userId, ourUserId] },
      receiver: { $in: [userId, ourUserId] },
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
