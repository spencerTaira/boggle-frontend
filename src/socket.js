import { io } from 'socket.io-client';
import URL from './config';
import { v4 as uuid } from 'uuid';

//export const socket = io(URL, {autoConnect:false});
export const socketIntro = io(`${URL}/intro`,{
   query: {
     client_id: getPlayerId()
   }
 });
// export const socketIntro = io(`${URL}/intro`,{autoConnect:false});
export const socketLobby = io(`${URL}/lobby`, {
//   reconnectionDelay: 10000, // defaults to 1000
//   reconnectionDelayMax: 10000 // defaults to 5000
   autoConnect:false
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
   //check local storage
   //if player id exists, return it
   //otherwise, make it, store it, then return it

   let clientId = localStorage.getItem('clientId');
   if (!clientId) {
      clientId = uuid()
   }
   return clientId
   
}