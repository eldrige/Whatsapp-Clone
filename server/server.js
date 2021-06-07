const PORT = 4500;
const io = require('socket.io')(PORT, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log(`Socket connected on port: ${PORT}`);
  const id = socket.handshake.query.id;
  socket.join(id);
  // when we send msg (from client to someone else)
  socket.on('send-message', ({ recipients, text }) => {
    // send msg to all recipients
    recipients.forEach((recipient) => {
      // removes author of message from recieving list (recipients)
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('recieve-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
