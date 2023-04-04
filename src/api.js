import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

class BoggleApi {

   static async checkLobby(lobbyId) {
      try {
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/lobby`,
               params: lobbyId
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

   static async createLobby(lobbyData, playerId) {
      data = {...lobbyData, playerId}
      
      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/create`,
               data: data
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

   static async authenticateAndJoinLobby(lobbyData, playerId) {
      data = {...lobbyData, playerId}
      
      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/join`,
               data: data
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

   static async joinLobby(playerData) {
      try {
         const result = await axios(
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/join`,
               data: playerData
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
}

export default BoggleApi;