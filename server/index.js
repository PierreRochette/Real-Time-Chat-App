// Requirements
// We need this to build this our server with Socket.io

const express = require('express'); 
const app = express(); 
const http = require('http'); 
const cors = require('cors'); 
const { Server } = require("socket.io")
app.use(cors()); 

// Create server 
const server = http.createServer(app); 


// Instantiate Socket server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"], 
    }, 
}); 

// We are listening on an event with socket.io server
io.on("connection", (socket) => {
    console.log("User connected : ", socket.id); 

    socket.on("join_room", (data) => {
        socket.join(data); 
        console.log(`User with id: ${socket.id} joined room: ${data}`); 
    }); 

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data); 
        console.log(data); 
    }); 

    socket.on("disconnect", () => {
        console.log("User Disconnected : ", socket.id); 
    }); 
}); 

server.listen(3001, () => {
    console.log("Server running"); 
}); 


