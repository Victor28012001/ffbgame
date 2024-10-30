// controllers/friendController.js
const Player = require('../models/Player');
const Friend = require('../models/friend');
const Notification = require('../models/Notification');

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  const { requesterId, recipientId } = req.body;

  try {
    const requester = await Player.findById(requesterId);
    const recipient = await Player.findById(recipientId);

    if (!requester || !recipient) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if a friendship already exists
    const existingFriendship = await Friend.findOne({
      requester: requester._id,
      recipient: recipient._id,
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    const newFriendship = new Friend({
      requester: requester._id,
      recipient: recipient._id,
      status: 'pending',
    });

    await newFriendship.save();

    // Log the friend request activity
    const activity = new PlayerActivity({
        player: requester._id,
        activityType: 'send_friend_request',
        description: `Player ${requester.walletAddress} sent a friend request to ${recipient.walletAddress}.`,
        metadata: { recipientId: recipient._id },
      });
      await activity.save();

      
    // Create notification for the recipient
    const notification = new Notification({
        recipient: recipient._id,
        sender: requester._id,
        type: 'friend_request',
        message: `${requester.name} sent you a friend request.`,
      });
      await notification.save();
  

    res.status(200).json({ message: 'Friend request sent successfully', newFriendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res) => {
  const { requesterId, recipientId } = req.body;

  try {
    const friendship = await Friend.findOneAndUpdate(
      {
        requester: requesterId,
        recipient: recipientId,
        status: 'pending',
      },
      { status: 'accepted' },
      { new: true }
    );

    if (!friendship) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Create notification for the requester
    const notification = new Notification({
        recipient: requesterId,
        sender: recipientId,
        type: 'friend_accept',
        message: `Your friend request was accepted by ${friendship.recipient.name}.`,
      });
      await notification.save();
  

    res.status(200).json({ message: 'Friend request accepted', friendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject a friend request
exports.rejectFriendRequest = async (req, res) => {
  const { requesterId, recipientId } = req.body;

  try {
    const friendship = await Friend.findOneAndUpdate(
      {
        requester: requesterId,
        recipient: recipientId,
        status: 'pending',
      },
      { status: 'rejected' },
      { new: true }
    );

    if (!friendship) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Create notification for the requester
    const notification = new Notification({
        recipient: requesterId,
        sender: recipientId,
        type: 'friend_reject',
        message: `Your friend request was rejected by ${friendship.recipient.name}.`,
      });
      await notification.save();
  

    res.status(200).json({ message: 'Friend request rejected', friendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get list of friends
exports.getFriends = async (req, res) => {
  const { playerId } = req.params;

  try {
    const friends = await Friend.find({
      $or: [{ requester: playerId, status: 'accepted' }, { recipient: playerId, status: 'accepted' }],
    }).populate('requester recipient');

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Remove a friend
exports.removeFriend = async (req, res) => {
    const { requesterId, recipientId } = req.body;
  
    try {
      const friendship = await Friend.findOneAndDelete({
        $or: [
          { requester: requesterId, recipient: recipientId, status: 'accepted' },
          { requester: recipientId, recipient: requesterId, status: 'accepted' },
        ],
      });
  
      if (!friendship) {
        return res.status(404).json({ message: 'Friendship not found' });
      }
  
      // Notify both players about the removal
      const requester = await Player.findById(requesterId);
      const recipient = await Player.findById(recipientId);
  
      if (requester && recipient) {
        const requesterNotification = new Notification({
          recipient: requesterId,
          type: 'friend_remove',
          message: `You removed ${recipient.name} as a friend.`,
        });
        await requesterNotification.save();
  
        const recipientNotification = new Notification({
          recipient: recipientId,
          type: 'friend_remove',
          message: `${requester.name} removed you as a friend.`,
        });
        await recipientNotification.save();
      }
  
      res.status(200).json({ message: 'Friendship removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };