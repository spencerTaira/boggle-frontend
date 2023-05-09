import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../api";
import userContext from "../../userContext";
import LobbyUI from "./lobbyUI/LobbyUI";
import GameUI from "./gameUI/GameUI";
import ChatBox from "./ChatBox";
import { socketLobby } from "../../socket";
import { PlayerMessageInterface, PlayerInLobbyInterface } from "../../interfaces";

import './Lobby.css';

/**
 * Renders top level Lobby component which houses both lobby/game UIs
 *
 * State:
 *
 *      players: [{
 *          playerName: string,
            playerId: number
 *      }, ...]

        playerMessages: [{
            playerName: string,
            message: string
        }, ...]

        lobbyData: {
            "game_length": 0,
            "host": null,
            "lobby_name": "",
            "max_players": 0,
            "private": true
        }

        gameStart: Boolean

    Props: None
    Context: { playerData }
 *
 */

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
    const [gameStart, setGameStart] = useState(false);

    console.log("what is playerData in Lobby Component", playerData);
    console.log('What is lobby data?', lobbyData);
    console.table(players);
    console.table(playerMessages);

    function appendMessage(newMessage: PlayerMessageInterface) {
        console.log('UPDATING MESSAGES');
        setPlayerMessages((prevMessages) => ([...prevMessages, newMessage]));
    }

    function updatePlayers(playersInLobby: Array<PlayerInLobbyInterface>) {
        console.log('UPDATING PLAYERS');
        console.log(playersInLobby);
        setPlayers(() => playersInLobby);
    }

    useEffect(() => {
        console.debug('Lobby Use Effect Running');

        
       

        async function checkAndJoinLobby() {
            const result = await BoggleAPI.joinLobby({ lobbyName: id, playerId: playerData.playerId });

            if (result.error) {
                // able to send information along with navigate and access at the final destination
                navigate('/', { state: { error: result.error } });
            }

            setLobbyData(() => result.lobby);
            socketLobby.connect()
        }

        checkAndJoinLobby();


        //We should never see our own leaving message
        socketLobby.on('message', appendMessage);
        socketLobby.on('update_players', updatePlayers);
        socketLobby.on('connected', () => socketLobby.emit('player_data', playerData));
        socketLobby.on('joined', () => {
            console.log("We have joined!")
            socketLobby.emit("chat", {
                playerName:playerData.playerName,
                message:`****joined the lobby!****`
            },
            id
        )});
        // socketLobby.on('connect', testReconnect)

        // setTimeout(() => {
        //     if (socketLobby.io.engine) {
        //       // close the low-level connection and trigger a reconnection
        //       socketLobby.io.engine.close();
        //     }
        // }, 10000);

        return () => {
            console.debug('Cleanup', playerData);
            if (playerData.currLobby !== '') {
                socketLobby.emit('leave', playerData);
            }
            socketLobby.off('message', appendMessage);
            socketLobby.off('update_players', updatePlayers);
            socketLobby.off('player_data')
            socketLobby.disconnect();
        };
    }, [id, navigate, playerData]);

    return (
        <div className="Lobby">
            {
                !gameStart
                    ? <LobbyUI
                        messages={playerMessages}
                        players={players}
                        lobbyData={lobbyData}
                        startGame={setGameStart}
                        appendMessage={appendMessage}
                    />
                    : <GameUI
                        gameState={setGameStart}
                    />
            }
            <ChatBox messagesData={playerMessages} />
            {/* <div className="Lobby-current-players">
                Current players
                {players.map(player=><p>{player.playerName}</p>)}
            </div> */}
        </div>
    );
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