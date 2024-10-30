const Game = require("../models/game");
const { verifyTransaction } = require('../services/verifyTransaction');
const { payoutJuksbucks, calculateJuksbucksPayout } = require('../services/juksbucksService');

// Create a new game session
exports.createGame = async (req, res) => {
  try {
    const { gameId, initializedBy } = req.body;

    const newGame = new Game({
      gameId,
      initializedBy,
      players: [],
      game_status: "Open",
    });

    await newGame.save();
    res
      .status(201)
      .json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Join a game
exports.joinGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body;
    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Check if the game is open
    if (game.status !== "Open") {
      return res
        .status(400)
        .json({ message: "Cannot join game. The game is not open." });
    }

    // Check if the player is already part of the game
    const playerExists = game.players.some((player) =>
      player.playerId.equals(playerId)
    );
    if (playerExists) {
      return res
        .status(400)
        .json({ message: "Player has already joined the game" });
    }

    // Add player with initial score of 0
    game.players.push({ playerId, score: 0 });
    await game.save();

    res.status(200).json({ message: "Player joined the game", game });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a player's score
exports.updateScore = async (req, res) => {
  try {
    const { gameId, playerId, score } = req.body;
    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Find the player in the game and update their score
    const player = game.players.find((player) =>
      player.playerId.equals(playerId)
    );
    if (!player) {
      return res.status(404).json({ message: "Player not found in the game" });
    }

    player.score = score; // Update the score
    await game.save();

    res.status(200).json({ message: "Player score updated", game });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// End game and declare the winner
exports.endGame = async (req, res) => {
  try {
    const { gameId, winnerId } = req.body;
    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Ensure the winner is a player in the game
    const winnerExists = game.players.some((player) =>
      player.playerId.equals(winnerId)
    );
    if (!winnerExists) {
      return res
        .status(400)
        .json({ message: "Winner is not a part of the game" });
    }

    // Update the winner and change the game status to 'Closed'
    game.winner = winnerId;
    game.status = "Closed";
    const totalPlayers = game.players.length; // Get total players
    const winner = game.players.find((player) => player.id === winnerId); // Find the winner
    await game.save();
    // Calculate Juksbucks for the winner
    const juksbucksToAward = calculateJuksbucksPayout(true, totalPlayers);

    // Payout Juksbucks to the winner
    const payoutResult = await payoutJuksbucks(
      winner.walletAddress,
      juksbucksToAward
    );

    // Verify the payout transaction
    const verificationResult = await verifyTransaction(payoutResult.signature); // Assuming payoutJuksbucks returns an object with a 'signature' property

    if (!verificationResult.success) {
      return res.status(500).json({ message: "Payout verification failed", details: verificationResult.message });
    }


    res.status(200).json({ message: "Game ended, winner declared", game , payoutResult, juksbucksBalance: verificationResult.juksbucksBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWinner = async (req, res) => {
  try {
    const { gameId } = req.params; // Assuming the game ID is passed as a URL parameter
    const game = await Game.findOne({ gameId });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (game.players.length === 0) {
      return res.status(400).json({ message: "No players in the game" });
    }

    // Find the highest score
    let highestScore = Math.max(...game.players.map((player) => player.score));

    // Get all players who have the highest score
    const winners = game.players.filter(
      (player) => player.score === highestScore
    );

    // If there's more than one winner, handle tie logic (custom logic can be applied here)
    if (winners.length > 1) {
      // Example: declare multiple winners (you can add more complex tiebreaker logic if needed)
      game.winner = winners.map((w) => w.playerId); // Store all winner IDs
      await game.save();

      return res.status(200).json({
        message: `There is a tie between players`,
        winners,
      });
    } else {
      // Single winner
      const winner = winners[0];
      game.winner = winner.playerId; // Store the winner's ID
      await game.save();

      return res.status(200).json({
        message: "Winner determined successfully",
        winner,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Function to get games by status
exports.getGamesByStatus = async (req, res) => {
    const { status } = req.params;
  
    try {
      const games = await Game.find({ game_status: status });
      if (games.length === 0) {
        return res.status(404).json({ message: 'No games found with the given status.' });
      }
      return res.status(200).json(games);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };