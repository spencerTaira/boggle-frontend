import { io } from 'socket.io-client';

const URL = 'http://127.0.0.1:5000';

export const socket = io(URL);
export const socketIntro = io(`${URL}/intro`);
export const socketLobby = io(`${URL}/lobby`);