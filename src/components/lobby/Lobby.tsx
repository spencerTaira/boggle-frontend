import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../api";
import userContext from "../../userContext";
import EnterPasswordForm from "./EnterPasswordForm";
import ChatBox from "./ChatBox";
import { socket } from "../../socket";

function Lobby() {
    console.debug('Entered Lobby');

    const { id } = useParams<{ id: string }>();
    const { playerData, playerMessages, appendMessages } = useContext(userContext);
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
        
        socket.on('connected', onConnect);
        function onConnect(msg: string) {
            console.log("Message received", msg);
            socket.emit("joining", playerData)
        }
        
        socket.on('joined', handleJoined)
        function handleJoined(msg:Record<string, string>){
            console.log("Did we join?",msg)
        }

        return () => {
            socket.off('connected', onConnect);
        };
        //Who is in lobby display (info)
        //Websocket ask for other player data
        //Announce entrance into room
    }, [id, navigate]);

    return (
        <div>
            {playerData.currLobby !== id
                ?
                <EnterPasswordForm id={id!} />
                :
                <div>
                    <p>LOBBBBBY: {id}</p>
                    <p>I am player: {playerData.playerName}</p>
                    <ChatBox messages={playerMessages}/>
                </div>
            }
        </div>
    )
}

export default Lobby;

//TODO: increment/decrement players in room (you can be here, but are you in the room?)
//TODO: join room in database upon entering
//TODO: Figure out when to update last active for player model
//TODO: figure out what websockets will handle for data
//TODO: change host if existing host leaves, or close room if no players
//TODO: simple chat box to test specific room data