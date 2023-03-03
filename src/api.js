import axios from "axios";

const BASE_API_URL = "http://localhost:5000"; 

class BoggleApi {
   
   static async createRoom(roomData){
      //console.log("what is roomData", roomData);
      try{
         const result = await axios.post(`${BASE_API_URL}/room/create`, roomData);
         return result.data;
      } catch (e) {
         console.log(e);
         const err = new Error("Unable to create room");
         err.status = 400;
         throw err;
      }
   }

   static async enterRoom(roomData){
      console.log("what is roomData", roomData);
      try{
         const result = await axios(
            {
               method: "get",
               url: `${BASE_API_URL}/room/enter`,
               params: roomData
            }
         )
         return result.data;
      } catch (e) {
         console.log(e);
         const err = new Error("Unable to join room");
         err.status = 400;
         throw err;
      }
   }

   static async joinRoom(playerData){
      try{

      } catch (e) {
         
      }
   }
}

export default BoggleApi;