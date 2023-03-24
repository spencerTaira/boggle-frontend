import React, { useState, useEffect } from "react";
import EnterPlayerDataForm from "./EnterPlayerDataForm";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../api";

function Lobby() {
    const {id} = useParams<{id: string}>();
    let playerDataStr:string|undefined = sessionStorage.getItem('playerData') || undefined;
    let playerData = playerDataStr ? JSON.parse(playerDataStr!) : {};

    const navigate = useNavigate();
    console.log("what is playerData", playerData);

    useEffect(() => {
        async function checkLobby() {
            const result = await BoggleAPI.checkLobby({lobbyName: id});

            if (result.error) {
                // able to send information along with navigate and access at the final destination
                navigate(
                    '/',
                    {
                        state: {
                            error: result.error
                        }
                    }
                )
            }
        }

        checkLobby();
    });

    //TODO: add state/effect to handle fully joining a room

    if(!playerData.playerId){
        return(
            <div>
                <EnterPlayerDataForm lobbyId={id!}/>
            </div>
        )
    }
    return (
            <div>
                <p>LOBBBBBY: {id}</p>
                <p>I am player: {playerData.playerId}</p>
            </div>
    )
}

export default Lobby;