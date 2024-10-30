// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Send a message
router.post('/send', chatController.sendMessage);

// Fetch chat history between two players
router.get('/history/:player1Id/:player2Id', chatController.getChatHistory);

module.exports = router;
