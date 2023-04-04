import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../api";
import userContext from "../../userContext";
import EnterPasswordForm from "./EnterPasswordForm";

function Lobby() {
    console.debug('Entered Lobby');

    const { id } = useParams<{ id: string }>();
    const { playerData} = useContext(userContext);
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
    console.log('What is lobby data?', lobbyData);

    //TODO: Figure out where to add lobby verification with playerData in or out of useEffect???
    useEffect(() => {
        async function checkLobby() {
            const result = await BoggleAPI.checkLobby({ lobbyName: id });

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

            if (result.lobbyData.curr_players >= result.lobbyData.max_players) {
                navigate(
                    '/',
                    {
                        state: {
                            error: `Lobby ${id} full. Sorry :-(`
                        }
                    }
                )
            }

            setLobbyData(() => result.lobbyData)
        }

        checkLobby();
    }, [id, navigate]);

    return (
        <div>
            {playerData.currLobby !== id 
            ?
            <EnterPasswordForm id={id!}/> 
            :
            <div>
            <p>LOBBBBBY: {id}</p>
            <p>I am player: {playerData.playerName}</p>
            </div>
            }
        </div>
    )
}

export default Lobby;

//TODO: increment/decrement players in room, 
//TODO: join room in database upon entering