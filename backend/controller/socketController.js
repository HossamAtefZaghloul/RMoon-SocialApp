// socketController.js
export  function socketController(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for sendMessage events
    socket.on('sendMessage', (messageData) => {
      const { sender, receiverId, content } = messageData;
      const message = { sender, receiver: receiverId, content, timestamp: new Date() };

      // Broadcast the message to the specific receiver only
      io.to(receiverId).emit('receiveMessage', message); 

      // (Optional) Save message to the database here if needed
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
