const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = new Server(server);


app.use(cors());


app.get("/", (req, res) => {
  res.json("hello");
});





const PORT = 8000||process.env.PORT; // Add a default value for PORT

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const users = {};
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('user-joined', (data) => {
    console.log('User joined:', data);
    users[socket.id] = data;
    socket.broadcast.emit('new-user-joined', { message: `${data} joined the chat`, position: 'left' });
  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.broadcast.emit('message-received', { message: data, position: 'left' });
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      console.log('User disconnected:', user);
      socket.broadcast.emit('leave', { message: `${user} left the chat`, position: 'left' });
      delete users[socket.id];
    }
  });
});
