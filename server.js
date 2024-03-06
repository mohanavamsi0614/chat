const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const { join } = require('path');
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("route",(route)=>{
        socket.join(route);
        console.log("hey i got you");
        
        // Handle messages within the room
      
    });
    socket.on("message", (message,route,user) => {
        console.log("Received message:", message);
        io.to(route).emit("show", message,user);
    });
});

app.use(express.static(__dirname + '/public'));

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
