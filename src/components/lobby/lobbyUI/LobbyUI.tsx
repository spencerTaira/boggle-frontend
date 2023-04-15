import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../../api";
import userContext from "../../../userContext";
import ChatBox from "../ChatBox";
import { socket, socketLobby } from "../../../socket";

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
// function LobbyUI({messages, players, lobbyData, startGame}) {
//     console.debug('Lobby UI');

//     const { playerData } = useContext(userContext);

// }

// export default LobbyUI;