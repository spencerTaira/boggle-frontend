import { io } from 'socket.io-client';
import URL from './config';

export const socket = io(URL);
export const socketIntro = io(`${URL}/intro`);
export const socketLobby = io(`${URL}/lobby`, {
  reconnectionDelay: 10000, // defaults to 1000
  reconnectionDelayMax: 10000 // defaults to 5000
});

socketLobby.on('connect', (args) => {
  console.log('Did we connect?', socketLobby);
  // args.reconnect = true;
  console.log('This is Args', args);
});

socketLobby.on('reconnect', () => {
  console.log('Did we reconnect?', socketLobby);
})