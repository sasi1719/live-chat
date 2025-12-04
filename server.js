const io = require("socket.io")(3000, {
  cors: { origin: "*" }
});

let typingTimeout;

io.on("connection", (socket) => {
  
  socket.on("live_text", (data) => {

    // Send typing update to other users
    socket.broadcast.emit("live_text_update", data);

    // Clear old timeout if user types again
    clearTimeout(typingTimeout);

    // After 1.5 seconds of no typing → unlock all other clients
    typingTimeout = setTimeout(() => {
      socket.broadcast.emit("unlock_textbox");
    }, 1500);
  });

});
