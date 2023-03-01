import axios from "axios";

const BASE_API_URL = "http://localhost:5000"; 

class BoggleApi {
   
   static async createRoom(roomData){
      roomData["password"] = roomData["password"] || "password";
      console.log("what is roomData", roomData);
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
}

export default BoggleApi;