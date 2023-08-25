import { io } from 'socket.io-client';
import URL from './config';

//export const socket = io(URL, {autoConnect:false});
export const socketIntro = io(`${URL}/intro`,{
   query: {
      player_id: getPlayerId()
   }
 });
// export const socketIntro = io(`${URL}/intro`,{autoConnect:false});
export const socketLobby = io(`${URL}/lobby`, {
   query: {
      player_id: getPlayerId()
   }
});

// socketLobby.on('connect', (args) => {
//   console.log('Did we connect?', socketLobby);
//   // args.reconnect = true;
//   console.log('This is Args', args);
// });

// socketLobby.on('reconnect', () => {
//   console.log('Did we reconnect?', socketLobby);
// })

function getPlayerId(){
   const playerId = localStorage.getItem('playerId');

   if (!playerId) {
      throw new Error('Please LOGIN!')
   }

   return playerId;

}