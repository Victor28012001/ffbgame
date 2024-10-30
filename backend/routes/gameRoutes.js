const express = require('express');
const { getCharacterDetails, selectFighters, purchaseTeam } = require('../controllers/gameController');

const router = express.Router();

// router.get('/characters/:characterId', getCharacterDetails);
// router.post('/select-fighters', selectFighters);
// router.post('/purchase-team', purchaseTeam);
const gameController = require('../controllers/gameController');

// Routes for the game model
router.post('/create', gameController.createGame);
router.post('/join', gameController.joinGame);
router.post('/score', gameController.updateScore);
router.post('/end', gameController.endGame);
router.post('/winner', gameController.getWinner);
router.get('/status/:status', gameController.getGamesByStatus);

module.exports = router;
