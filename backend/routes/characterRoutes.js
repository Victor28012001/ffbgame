const express = require('express');
const { createCharacter, getCharacter, purchaseCharacter, listCharacter, modifyListPrice, buyCharacter, fetchCharacters, fetchPlayersCharacters } = require('../controllers/characterController');
const router = express.Router();
const characterController = require('../controllers/characterController');

// router.post('/characters', createCharacter);
router.get('/characters', getCharacter);
router.post('/characters/purchase', purchaseCharacter);
router.post('/create', createCharacter);
router.post('/list', listCharacter);
router.post('/modify-price', modifyListPrice);
router.post('/buy', buyCharacter);
router.get('/characters/:id?', fetchCharacters);
router.get('/players/:playerId/characters', fetchPlayersCharacters);
router.put('/characters/:characterId', characterController.updateCharacter);

module.exports = router;
