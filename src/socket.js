import { io } from 'socket.io-client';
import URL from './config';

export const socket = io(URL);
export const socketIntro = io(`${URL}/intro`);
export const socketLobby = io(`${URL}/lobby`);