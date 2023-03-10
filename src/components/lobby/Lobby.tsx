import React from "react";
import EnterPlayerDataForm from "./EnterPlayerDataForm";
import { useParams } from "react-router-dom";

function Lobby() {
    const {id} = useParams<{id: string}>();
    let playerDataStr:string|undefined = sessionStorage.getItem('playerData') || undefined;
    let playerData = playerDataStr ? JSON.parse(playerDataStr!) : {};
    console.log("what is playerData", playerData);
    
    //TODO: add state/effect to handle fully joining a room
    
    if(!playerData.playerId){
        return(
            <div>
                <EnterPlayerDataForm roomId={id!}/>
            </div>
        )
    }
    return (
            <div>
                <p>LOBBBBBY: {id}</p>
                <p>{playerData.playerId}</p>
            </div>    
    )
}

export default Lobby;