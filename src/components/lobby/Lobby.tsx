import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../api";
import userContext from "../../userContext";
import EnterPasswordForm from "./EnterPasswordForm";
// import LobbyUI from "./lobbyUI/LobbyUI";
import GameUI from "./gameUI/GameUI";
import { socketLobby } from "../../socket";

interface PlayerMessageInterface {
    playerName: string,
    message: string
};

interface PlayerInLobbyInterface {
    playerName: string,
    playerId: number
}

function Lobby() {
    console.debug('Entered Lobby Component');

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { playerData } = useContext(userContext);
    const [lobbyData, setLobbyData] = useState(
        {
            "game_length": 0,
            "host": null,
            "lobby_name": "",
            "max_players": 0,
            "private": true
        }
    );
    const [players, setPlayers] = useState<Array<PlayerInLobbyInterface>>([]);
    const [playerMessages, setPlayerMessages] = useState<Array<PlayerMessageInterface>>([]);
    const [joined, setJoined] = useState(false);
    const [gameStart, setGameStart] = useState(false);

    console.log("what is playerData in Lobby Component", playerData);
    console.log('What is lobby data?', lobbyData);
    console.table(players);
    console.table(playerMessages);

    function appendMessage(newMessage: PlayerMessageInterface) {
        setPlayerMessages((prevMessages) => ([...prevMessages, newMessage]));
    }

    useEffect(() => {
        console.debug('Lobby Use Effect Running');
        async function checkAndJoinLobby() {
            const result = await BoggleAPI.checkLobby({ lobbyName: id });

            if (result.error) {
                // able to send information along with navigate and access at the final destination
                navigate('/', { state: { error: result.error } });
            }

            if (result.lobbyData.curr_players >= result.lobbyData.max_players) {
                navigate('/', { state: { error: `Lobby ${id} full. Sorry :-(` } });
            }

            setLobbyData(() => result.lobbyData);

            //TODO: Figure out how to handle joining vs rejoining
            // if (playerData.currLobby === id) {
        //     if (lobbyData.host === playerData.playerId) {
        //         setJoined(() => true);
        //     } else if (!joined) {
        //         rejoinLobby(playerData);
        //     }

        //     socketLobby.emit("joining", playerData);
        // }
            socketLobby.emit('test', 'Did this work');
        }

        checkAndJoinLobby();

        async function rejoinLobby(playerData:any){
            const result = await BoggleAPI.rejoinLobby(playerData)
            if (result.error) {
                navigate('/', { state: { error: result.error } });
            }
        }

        /*
            Because we are allowing people to rejoin without re-entering a passworde if 'currLobby'
            exists in playerData with the right 'ID', they do not have to go through the enterpassword
            or joinlobbyform which has the 'Join' method which puts them in the proper table.

            Thus, if a player is "rejoining" they must go through a rejoining process on the backend in
            order to be put into the proper table.

            Our ch


        */


        // if (playerData.currLobby === id) {
        //     if (lobbyData.host === playerData.playerId) {
        //         setJoined(() => true);
        //     } else if (!joined) {
        //         rejoinLobby(playerData);
        //     }

        //     socketLobby.emit("joining", playerData);
        // }

        function updatePlayers(playersInLobby: Array<PlayerInLobbyInterface>) {
            setPlayers(() => playersInLobby);
        }

        //We should never see our own leaving message
        socketLobby.on('message', appendMessage);
        socketLobby.on('update_players', updatePlayers);

        return () => {
            socketLobby.emit('leave', playerData)
            socketLobby.off('message', appendMessage);
            socketLobby.off('update_players', updatePlayers);
        };
    }, [id, navigate, playerData, joined]);

    if (playerData.currLobby !== id) {
        return (
            <EnterPasswordForm id={id!} setJoined={setJoined} />
        )
    }

    return (
        <div>
            {/* {
                !gameStart
                ? <LobbyUI messages={playerMessages} players={} lobbyData={lobbyData} setGameStart={setGameStart} />
                : <GameUI />
            } */}
                {/* <div>
                    <p>LOBBBBBY: {id}</p>
                    <p>I am player: {playerData.playerName}</p>
                    <ChatBox messagesData={playerMessages}/>
                </div>
            } */}
        </div>
    )
}

export default Lobby;

//TODO: Figure out when to update last active for player model
//TODO: change host if existing host leaves, or close room if no players

/*

                                                    Lobby
                                                    state: messages, joined, gameStarted, players, lobbyInfo
                                                    props:

                                        Lobby Interface     Game
                                        state: joined
*/