const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const playerRoutes = require("./routes/playerRoutes");
const characterRoutes = require("./routes/characterRoutes");
const adminRoutes = require("./routes/adminRoutes");
const gameRoutes = require("./routes/gameRoutes");
const duelRoutes = require("./routes/duelRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const storageRoutes = require("./routes/storageRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const friendRoutes = require("./routes/friendRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
require("dotenv").config();

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server
// const io = socketIo(server); // Initialize Socket.IO with the server

// Middleware to parse JSON bodies
app.use(express.json());

// Allow CORS for all requests or restrict it to specific origins
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // If you need to include cookies in requests
  })
);
const io = socketIo(server, {
  cors: {
    origin: "*", // or "*" to allow all origins
    methods: ["GET", "POST"], // allowed methods
    allowedHeaders: ["Content-Type"],
    credentials: true, // if you need to include credentials in requests
  },
});

let chatrooms = [];
let chatHistories = {}; // Store chat histories for each room

// Connect to MongoDB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Join room for the user
  socket.on("join", (playerId) => {
    socket.join(playerId); // Use player's ID as the room ID
    console.log(`Player ${playerId} joined room`);
  });

  socket.on("createChatroom", (roomName) => {
    if (roomName && !chatrooms.includes(roomName)) {
      chatrooms.push(roomName);
      chatHistories[roomName] = []; // Initialize chat history for new room
      io.emit("chatroomsUpdated", chatrooms);
    }
  });

  socket.on("joinChatroom", (roomName) => {
    if (chatrooms.includes(roomName)) {
      socket.join(roomName); // Join the chat room
      socket.emit("joinedChatroom", chatHistories[roomName]); // Send chat history
    }
  });

  socket.on('message', (data) => {
    const { chatroomName, message } = data;
    if (chatrooms.includes(chatroomName)) {
        chatHistories[chatroomName].push(message); // Save message to history
        io.to(chatroomName).emit('message', message); // Broadcast message to room
    }
});

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

app.get("/chatrooms", (req, res) => {
  res.json(chatrooms);
});

// Attach io to the request object for use in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working");
});

// API Routes
app.use("/api/players", playerRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/duels", duelRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);

// Handle 404 for unmatched routes
app.all("*", (req, res) => {
  console.log(
    `Request made to unhandled route: ${req.method} ${req.originalUrl}`
  );
  res.status(404).send("Route not found");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
