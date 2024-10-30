const mongoose = require('mongoose');
const UserTransaction = require('./UserTransaction');

const PlayerSchema = new mongoose.Schema({
    monika: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
    avatarUrl: { type: String, required: true },
    bio: { type: String, default: '' },
    characters: { type: [Number], default: [] },
    points: { type: Number, default: 1050 },
    juksbucksBalance: { type: Number, default: 0.0 },
    solanaBalance: { type: Number, default: 0.0 },
    playerAccount: { type: String, required: true },
    totalBattles: { type: Number, default: 0 },
    totalWins: { type: Number, default: 0 },
    totalLosses: { type: Number, default: 0 },
    totalAiBattles: { type: Number, default: 0 },
    aiBattlesWon: { type: Number, default: 0 },
    aiBattlesLosses: { type: Number, default: 0 },
    transactionHistory: [UserTransaction.schema],
    avatarExperience: { type: Number, default: 0 }, // Add avatar experience
    avatarMarketValue: { type: Number, default: 0 }, // Add avatar market value
    nftMintAddress: { type: String, default: '' }, // Field for NFT mint address
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

// class Player {
//     constructor(data) {
//         this.data = data;
//     }

//     reduceCartesiTokenBalance(amount) {
//         if (this.data.cartesiTokenBalance >= amount) {
//             this.data.cartesiTokenBalance -= amount;
//         } else {
//             throw new Error('Insufficient nebula balance');
//         }
//     }

//     increaseCartesiTokenBalance(amount) {
//         this.data.cartesiTokenBalance += amount;
//     }

//     addCharacter(characterId) {
//         this.data.characters.push(characterId);
//     }

//     removeCharacter(characterId) {
//         const index = this.data.characters.indexOf(characterId);
//         if (index > -1) {
//             this.data.characters.splice(index, 1);
//         } else {
//             throw new Error('Character not found');
//         }
//     }

//     async registerWin(allCharacters) {
//         this.data.totalBattles++;
//         this.data.totalWins++;
//         // Logic to update character wins goes here
//         await this.data.save();
//     }

//     async registerLoss(allCharacters) {
//         this.data.totalBattles++;
//         this.data.totalLosses++;
//         // Logic to update character losses goes here
//         await this.data.save();
//     }

//     async registerTransaction(txId, methodCalled) {
//         const newTx = new UserTransaction({ transactionId: txId, methodCalled });
//         this.data.transactionHistory.push(newTx);
//         await this.data.save();
//     }
// }

// PlayerSchema.loadClass(Player);
module.exports = mongoose.model('Player', PlayerSchema);
