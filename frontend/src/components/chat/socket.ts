import { io } from 'socket.io-client';

export default function () {
  // Create a socket connection
  const socket = io('http://localhost:4000');

  function registerHandler(onMessageReceived: (msg: any) => void) {
    socket.on('message', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message');
  }

  socket.on('error', function (err: any) {
    console.log('received socket error:');
    console.log(err);
  });

  function register(name: string, cb: (response: any) => void) {
    socket.emit('register', name, cb);
  }

  function join(chatroomName: string, cb: (response: any) => void) {
    socket.emit('join', chatroomName, cb);
  }

  function leave(chatroomName: string, cb: (response: any) => void) {
    socket.emit('leave', chatroomName, cb);
  }

  function message(chatroomName: string, msg: string, cb: (response: any) => void) {
    socket.emit('message', { chatroomName, message: msg }, cb);
  }

  function getChatrooms(cb: (rooms: any) => void) {
    socket.emit('chatrooms', null, cb);
  }

  function getAvailableUsers(cb: (users: any) => void) {
    socket.emit('availableUsers', null, cb);
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
  };
}
