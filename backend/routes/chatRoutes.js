import express from 'express';
import { saveMessage, getChatHistory } from '../models/chatModel.js';
const router = express.Router();
import { processMessage } from '../controllers/webHookController.js';
// import authMiddleware from '../middlewares/authMiddleware';

// Save chat message
router.post('/send', async (req, res) => {
  try {
    const { sessionId, sender, message } = req.body;
    await saveMessage(sessionId, sender, message);
    res.status(201).json({ message: 'Message saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const chatHistory = await getChatHistory(req.params.sessionId);
    res.json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/dialogflow', processMessage);

export default router;
