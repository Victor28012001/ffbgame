const mongoose = require('mongoose');

const superPowerEnum = {
  THUNDERBOLT: 'Thunderbolt',
  FLAMETHROWER: 'Flamethrower',
  VINEWHIP: 'VineWhip',
  WATERGUN: 'WaterGun',
  SLEEPSONG: 'SleepSong',
  PSYCHIC: 'Psychic',
  ADAPTABILITY: 'Adaptability',
  SHADOWBALL: 'ShadowBall',
  HEADCRUSH: 'HeadCrush',
  SONICKICK: 'SonicKick',
  TELEKINETICHIT: 'TelekineticHit',
  INVISIBLECLAWS: 'InvisibleClaws',
  DODGENDTAILLASH: 'DodgeNdTailLash',
};

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  health: { type: Number, required: true },
  strength: { type: Number, required: true },
  attack: { type: Number, required: true },
  speed: { type: Number, required: true },
  super_power: { type: String, enum: Object.values(superPowerEnum), required: true },
  id: { type: Number, unique: true },
  total_battles: { type: Number, default: 0 },
  total_wins: { type: Number, default: 0 },
  total_losses: { type: Number, default: 0 },
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }, // Reference to Player
  mintAddress: { type: String, required: true }, // Mint address of the NFT
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  createdAt: { type: Date, default: Date.now },
  experience: { type: Number, default: 0 }, // Add experience for characters
});

const Character = mongoose.model('Character', characterSchema);
module.exports = { Character, superPowerEnum };
