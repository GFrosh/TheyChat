const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React dev server
    methods: ["GET", "POST"],
  },
});

// In-memory store for active rooms
const chat = {
	rooms: [],
	users: []
};


io.on("connection", (socket) => {
  	console.log("User connected:", socket.id);

	socket.on("join_room", (room) => {
		if (!chat.rooms.includes(room)) {
			chat.rooms.push(room);
		}
		socket.join(room);
		console.log(`User joined room: ${room}`);
	});

	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

// Endpoint to get active rooms
app.get("/rooms", (req, res) => {
  	res.json(chat.rooms);
});
app.get("/stats", (req, res) => {
  	res.json(chat);
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
