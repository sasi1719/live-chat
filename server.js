const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public")); // <-- MUST be correct

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("live_text", (data) => {
    socket.broadcast.emit("live_text_update", data);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
