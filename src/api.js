import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

class BoggleApi {

   static async createLobby(lobbyData){
      //console.log("what is lobbyData", lobbyData);
      try{
         const result = await axios.post(`${BASE_API_URL}/lobby/create`, lobbyData);
         return result.data;
      } catch (e) {
         console.log(e);
         const err = new Error("Unable to create lobby");
         err.status = 400;
         throw err;
      }
   }

   static async enterLobby(lobbyData){
      console.log("what is lobbyData", lobbyData);
      try{
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/lobby/enter`,
               params: lobbyData
            }
         )
         return result.data;
      } catch (e) {
         console.log(e);
         const err = new Error("Unable to enter lobby");
         err.status = 400;
         throw err;
      }
   }

   static async joinLobby(playerData){
      console.log("BOGGLE API JOIN Lobby playerDATA", playerData);
      try{
         const result = await axios (
            {
               method: "post",
               url: `${BASE_API_URL}/lobby/join`,
               data: playerData
            }
         )

         return result.data;
      } catch (e) {
         console.log(e);
         const err = new Error("Unable to join lobby");
         err.status = 400;
         throw err;
      }
   }
}

export default BoggleApi;