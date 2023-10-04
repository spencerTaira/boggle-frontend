import { io } from 'socket.io-client';
import URL from './config';

export const socketIntro = io(`${URL}/intro`, {autoConnect: false});

export const socketLobby = io(`${URL}/lobby`, {autoConnect: false});

export const socketGame = io(`${URL}/game`, {autoConnect: false});