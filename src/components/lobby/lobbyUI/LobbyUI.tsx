import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../../api";
import userContext from "../../../userContext";
import ChatBox from "../ChatBox";
import { socket, socketLobby } from "../../../socket";
import { PlayerMessageInterface, PlayerInLobbyInterface, LobbyInterface } from "../../../interfaces";

/*
    Renders LobbyUI component

    State:


    Props:
        messages - [{
            playerName: string,
            message: string
        }, ...]

        players - [playerName (str), ...]

        lobbyInfo - {
            "game_length": 0,
            "host": null,
            "lobby_name": "",
            "max_players": 0,
            "private": true
        }

        startGame - callback
*/

function LobbyUI({messages, players, lobbyData, startGame, appendMessage}:
    {
        messages: Array<PlayerMessageInterface>,
        players: Array<PlayerInLobbyInterface>,
        lobbyData: LobbyInterface,
        startGame: Function,
        appendMessage:Function
    }) {
    console.debug('Lobby UI');

    const { playerData } = useContext(userContext);

    return (
        <div>
            Lobby UI
            {/* <ChatBox messagesData={messages} appendMessage={appendMessage}/> */}
        </div>
    );
}

export default LobbyUI;