const { Character } = require("../models/Character");
const Player = require("../models/Player");
const playerController = require('./playerController');
// const {
//   Connection,
//   PublicKey,
//   Keypair,
//   SystemProgram,
//   Transaction,
// } = require("@solana/web3.js");
// const anchor = require("@project-serum/anchor");

// const connection = new Connection(
//   "https://api.mainnet-beta.solana.com",
//   "confirmed"
// );

const {
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
} = require("@solana/web3.js");
const { createMetadata, createMasterEdition } = require("@metaplex/js"); // Ensure you have Metaplex JS installed
const {
  getOrCreateAssociatedTokenAccount,
  mintTo,
} = require("@solana/spl-token");

// Function to mint a character as NFT
async function mintCharacterAsNFT(playerWallet, characterData) {
  // Connect to Solana
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  // Generate a new Keypair for the NFT
  const nftMint = Keypair.generate();

  // Create the metadata for the NFT
  const metadata = {
    name: characterData.name,
    symbol: "NFT",
    uri: characterData.avatarUrl, // The URL to the avatar image or model
    seller_fee_basis_points: 500, // Example: 5% fee
    creators: null, // Specify creators if applicable
  };

  // Create the NFT metadata and master edition
  const transaction = new Transaction();
  const metadataTx = await createMetadata({
    connection,
    wallet: playerWallet,
    mint: nftMint.publicKey,
    metadata,
  });

  transaction.add(metadataTx);

  const masterEditionTx = await createMasterEdition({
    connection,
    wallet: playerWallet,
    mint: nftMint.publicKey,
    edition: nftMint.publicKey, // Use mint address for master edition
    metadata: metadataTx,
  });

  transaction.add(masterEditionTx);

  // Send the transaction
  const signature = await connection.sendTransaction(transaction, [nftMint]);

  await connection.confirmTransaction(signature);

  return {
    success: true,
    mintAddress: nftMint.publicKey.toBase58(),
    signature,
  };
}

const createCharacter = async (req, res) => {
  const {
    name,
    health,
    strength,
    attack,
    speed,
    super_power,
    price,
    playerId,
  } = req.body;


  try {

    // Find the player by ID to get the wallet address
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const character = new Character({
      name,
      health,
      strength,
      attack,
      speed,
      super_power,
      price,
      playerId,
    });

    await character.save();


    // Assuming player.walletAddress contains the wallet address
    const playerWallet = player.walletAddress;
    const addCharacterReq = { body: { walletAddress: player.walletAddress, characterId: character._id } };
    await playerController.addCharacter(addCharacterReq, res);

    // Create character on Solana
    // const player = await Player.findById(playerId);
    // const payer = Keypair.fromSecretKey(/* your secret key here */);

    // Create transaction
    // const transaction = new Transaction().add(
    //   anchor.web3.SystemProgram.createAccount({
    //     fromPubkey: payer.publicKey,
    //     newAccountPubkey:
    //       new PublicKey(/* generate new character account key */),
    //     lamports: await connection.getMinimumBalanceForRentExemption(
    //       CharacterLayout.span
    //     ),
    //     space: CharacterLayout.span,
    //     programId: new PublicKey("YourProgramID"),
    //   }),
    //   anchor.web3.AnchorProgram.createAccount({
    //     accounts: {
    //       character: characterAccount.publicKey,
    //       payer: payer.publicKey,
    //       systemProgram: SystemProgram.programId,
    //     },
    //     data: {
    //       name,
    //       player: player.address,
    //       power,
    //     },
    //   })
    // );

    // // Send transaction
    // transaction.feePayer = payer.publicKey;
    // await transaction.sign([payer, characterAccount]);

    // // Send transaction
    // const signature = await connection.sendTransaction(transaction, [
    //   payer,
    //   characterAccount,
    // ]);
    // await connection.confirmTransaction(signature);
    // res.status(201).json(character);

    const result = await mintCharacterAsNFT(playerWallet, character); // Example function for minting


    await Character.create({
      name: character.name,
      health: character.health,
      strength: character.strength,
      attack: character.attack,
      speed: character.speed,
      super_power: character.super_power,
      price: character.price,
      owner: playerWallet, // Link the NFT to the owner's wallet address
      mintAddress, // Store the mint address of the NFT
    });


    if (result.success) {
      // Update the player's NFT mint address
      await Player.findOneAndUpdate(
        { walletAddress: playerWallet }, // Find player by wallet address
        { nftMintAddress: result.mintAddress }, // Update with mint address
        { new: true } // Return the updated document
      );

      return {
        success: true,
        mintAddress: result.mintAddress,
        signature: result.signature,
      };
    } else {
      throw new Error("NFT minting failed");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCharacter = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const purchaseCharacter = async (req, res) => {
  const { walletAddress, characterId } = req.body;

  try {
    const character = await Character.findById(characterId);
    if (!character)
      return res.status(404).json({ message: "Character not found" });

    character.owner = walletAddress;
    await character.save();
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listCharacter = async (req, res) => {
  const { characterId, price, walletAddress } = req.body;

  try {
    const player = await Player.findOne({ walletAddress });
    const character = await Character.findById(characterId);

    if (!character || character.owner.toString() !== player._id.toString()) {
      return res.status(403).json({ message: "Not the owner" });
    }

    character.price = price;
    await character.save();
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyListPrice = async (req, res) => {
  const { characterId, price, walletAddress } = req.body;

  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });
    const player = await Player.findById(character.owner);

    if (player.walletAddress !== walletAddress) {
      return res.status(403).json({ message: "Not the initial lister" });
    }

    character.price = price;
    await character.save();
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const buyCharacter = async (req, res) => {
  const { walletAddress, characterId } = req.body;

  try {
    const buyer = await Player.findOne({ walletAddress });
    const character = await Character.findById(characterId);

    if (!buyer || !character)
      return res.status(404).json({ message: "Buyer or Character not found" });

    if (buyer.cartesiTokenBalance < character.price) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    buyer.cartesiTokenBalance -= character.price;
    const seller = await Player.findById(character.owner);
    seller.cartesiTokenBalance += character.price * 0.97; // 3% fee
    await buyer.save();
    await seller.save();

    character.owner = buyer._id;
    await character.save();
    res.json(buyer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCharacters = async (req, res) => {
  const { id } = req.params;
  try {
    const characters = id
      ? await Character.findById(id)
      : await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchPlayersCharacters = async (req, res) => {
  const { playerId } = req.params;
  try {
    const characters = await Character.find({ playerId });
    res.json(characters);
  } catch (error) {
    res.status(500).send(error);
  }
};


const updateCharacter = async (req, res) => {
  const { characterId } = req.params; // Get characterId from the request parameters
  const { name, health, strength, attack, speed, super_power, price, playerId } = req.body; // Get attributes to update from request body

  try {
      // Find the character by ID
      const character = await Character.findById(characterId);
      if (!character) {
          return res.status(404).json({ message: "Character not found" });
      }

      // Update character attributes if provided
      if (name !== undefined) character.name = name;
      if (health !== undefined) character.health = health;
      if (strength !== undefined) character.strength = strength;
      if (attack !== undefined) character.attack = attack;
      if (speed !== undefined) character.speed = speed;
      if (super_power !== undefined) character.super_power = super_power;
      if (price !== undefined) character.price = price;

      // Update the owner field
      if (playerId) { // Check if playerId is provided
          const player = await Player.findById(playerId); // Use playerId from the request body
          if (!player) {
              return res.status(404).json({ message: "Player not found" });
          }
          character.owner = player._id; // Set owner to the player's ID
      }

      // Save the updated character
      await character.save();

      res.status(200).json({ message: "Character updated successfully", character });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


exports.upgradeCharacter = async (req, res) => {
  const { characterId, attribute, amount } = req.body;

  try {
      // Find the character to upgrade
      const character = await Character.findById(characterId);
      if (!character) {
          return res.status(404).json({ message: "Character not found" });
      }

      // Check if the attribute is valid
      if (!['health', 'strength', 'attack', 'speed'].includes(attribute)) {
          return res.status(400).json({ message: "Invalid attribute" });
      }

      // Ensure the amount is a positive number
      if (amount <= 0) {
          return res.status(400).json({ message: "Upgrade amount must be positive" });
      }

      // Apply the upgrade
      character[attribute] += amount;

      // Record the upgrade
      character.upgrades.push({ attribute, value: amount });

      await character.save();

      res.status(200).json({ message: "Character upgraded successfully", character });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createCharacter,
  getCharacter,
  purchaseCharacter,
  listCharacter,
  modifyListPrice,
  buyCharacter,
  fetchCharacters,
  fetchPlayersCharacters,
  updateCharacter,
};
