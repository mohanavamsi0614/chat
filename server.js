const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const { join } = require('node:path');
const server = http.createServer(app);
const io = socket(server);
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './index.html'));
  });  
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("message", (message) => {
        console.log("Received message:", message);
        io.emit("show", message);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
