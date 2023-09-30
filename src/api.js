import axios from "axios";
import URL from './config';

const BASE_API_URL = URL;

class BoggleApi {

   static async checkLobby(lobbyName) {
      console.log("what is lobbyId", lobbyName)
      try {
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/lobby`,
               params: {lobbyName}
            }
         )

         return result.data;
      } catch (e) {
         console.log("what is da e?", e)
         return {
            error: e.response.data.error,
            status: e.response.status
         }
      }
   }

   static async createLobby(lobbyData) {

      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/create`,
               data: lobbyData
            }
         )

         return result.data;
      } catch (e) {
         return {
            error: e.response.data.error,
            status: e.response.status
         }
      }
   }

   static async authenticate(lobbyCredentials){
      try {
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/lobby/authenticate`,
               params: lobbyCredentials
            }
         )

         return result.data;
      } catch (e) {
         return {
            error: e.response.data.error,
            status: e.response.status
         }
      }
   }

   static async joinLobby(joinData) {

      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/join`,
               data: joinData
            }
         )

         return result.data;
      } catch (e) {
         return {
            error: e.response.data.error,
            status: e.response.status
         }
      }
   }

   // static async rejoinLobby(playerData){

   //    try {
   //       const result = await axios(
   //          {
   //             method: "post",
   //             url: `${BASE_API_URL}/lobby/rejoin`,
   //             data: playerData
   //          }
   //       )

   //       return result.data;
   //    } catch (e) {
   //       return {
   //          error: e.response.data.error,
   //          status: e.response.status
   //       }
   //    }

   // }

   // static async joinLobby(playerData) {
   //    try {
   //       const result = await axios(
   //          {
   //             method: "post",
   //             url: `${BASE_API_URL}/lobby/join`,
   //             data: playerData
   //          }
   //       )

   //       return result.data;
   //    } catch (e) {
   //       return {
   //          error: e.response.data.error,
   //          status: e.response.status
   //       }
   //    }
   // }

   static async getPlayerData(playerId) {
      try {
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/player`,
               params: { playerId: playerId }
            }
         )

         return result.data
      } catch (e) {
         return {
            error: e.response.data.error,
            status: e.response.status
         }
      }
   }

   static async createPlayer(playerName) {
      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/player`,
               data: {...playerName}
            }
         )

         return result.data;
      } catch (e) {
         return {
            error: e.response.data.error,
            status: e.response.status
         }
      }
   }

   static async gameStart(lobbyId) {
      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/gameStart`,
               data: {
                  lobbyName: lobbyId
               }
            }
         )

         return result.data;
      } catch (e) {
         throw new Error(e)
      }
   }

   static async getBoard(lobbyId) {
      try {
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/lobby/board`,
               params: {
                  lobbyName: lobbyId
               }
            }
         )

         return result.data;
      } catch (e) {
         throw new Error(e)
      }
   }
   static async ping() {
      try {
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/ping-pong`,
            }
         )

         return result.data;
      } catch (e) {
         throw new Error(e)
      }
   }
}

export default BoggleApi;