const express = require('express');
const http = require('http');
const socket_io = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socket_io(server);
const cors=require('cors');


app.use(cors());
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('user-joined', (data) => {
    users[socket.id] = data;
    socket.broadcast.emit('new-user-joined', { message: `${data} joined the chat`, position: 'left' });
  });

  socket.on('message', (data) => {
    socket.broadcast.emit('message-received', { message: data, position: 'left' });
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.emit('leave', { message: `${user} left the chat`, position: 'left' });
      delete users[socket.id];
    }
  });
});

const PORT = 8000||process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
