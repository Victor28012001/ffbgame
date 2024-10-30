// controllers/chatController.js
const Message = require('../models/Message');
const Player = require('../models/Player');

// Send a message
exports.sendMessage = async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  try {
    const sender = await Player.findById(senderId);
    const recipient = await Player.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ message: 'Sender or recipient not found' });
    }

    const newMessage = new Message({
      sender: sender._id,
      recipient: recipient._id,
      message,
    });

    await newMessage.save();

    // Emit message to recipient via WebSocket (handled later with socket.io)
    req.io.to(recipientId).emit('newMessage', newMessage);

    res.status(200).json({ message: 'Message sent', newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controllers/chatController.js
// Fetch chat history between two players
exports.getChatHistory = async (req, res) => {
    const { player1Id, player2Id } = req.params;
  
    try {
      const messages = await Message.find({
        $or: [
          { sender: player1Id, recipient: player2Id },
          { sender: player2Id, recipient: player1Id },
        ],
      }).sort({ timestamp: 1 }); // Sort messages in ascending order of timestamp
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  // controllers/chatController.js
exports.markAsRead = async (req, res) => {
    const { messageId } = req.body;
  
    try {
      const message = await Message.findById(messageId);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      message.read = true;
      await message.save();
  
      res.status(200).json({ message: 'Message marked as read' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  