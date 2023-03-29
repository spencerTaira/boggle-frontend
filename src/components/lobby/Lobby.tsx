import React, { useState, useEffect, useContext } from "react";
import EnterPlayerDataForm from "./EnterPlayerDataForm";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../api";
import userContext from "../../userContext";

function Lobby() {
    const {id} = useParams<{id: string}>();

    const playerData = useContext(userContext);
    // playerData upon entering first time will be 'null'

    const [lobbyData, setLobbyData] = useState(
        {
            "curr_players": 0,
            "game_length": 0,
            "host": null,
            "lobby_name": "",
            "max_players": 0,
            "private": true
        }
    )

    const navigate = useNavigate();
    console.log("what is playerData in Lobby Component", playerData);

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

            if(result.lobbyData.curr_players >= result.lobbyData.max_players){
                navigate(
                    '/',
                    {
                        state: {
                            error: `Lobby ${id} full. Sorry :-(`
                        }
                    }
                )
            }
            
            
            setLobbyData((prevData)=>({...lobbyData, ...result.lobbyData}))
        }
        checkLobby();
    }, []);

    
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