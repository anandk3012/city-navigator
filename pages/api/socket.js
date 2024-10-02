// pages/api/socket.js
import { Server } from 'socket.io';

export default function handler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('newFare', (fare) => {
      socket.broadcast.emit('updateFares', fare);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  res.end();
}
