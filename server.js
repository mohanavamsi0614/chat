const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const { join } = require('path');
const server = http.createServer(app);
const io = socket(server);
app.get("/",(req,res)=>{
    res.sendFile(join(__dirname+"/public/maya.html"))
})
app.get("/chat",(req,res)=>{
    // res.send("hi")
    res.sendFile(join(__dirname+"/public/index.html"))
})
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("route",(route)=>{
        socket.join(route);
        // console.log("hey i got you");
    });
    socket.on("message", (message,route,user) => {
        console.log("Received message:", message);
        io.to(route).emit("show", message+" "+route,user);
    });
});

// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/maya.html'))
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
