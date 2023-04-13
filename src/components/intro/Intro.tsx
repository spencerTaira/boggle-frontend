import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CreateLobbyForm from "./CreateLobbyForm";
import JoinLobbyForm from "./JoinLobbyForm";
import EnterPlayerNameForm from "./EnterPlayerNameForm";
import { socketIntro } from "../../socket";
import userContext from "../../userContext";

interface LobbyInterface {
    "lobby_name": string,
    "curr_players": number,
    "max_players": number,
    // "game_length": number,
    // "private": boolean,
    // "password": string,
    // "host": number,
}

/**
 * Render Intro Component
 *
 * State:
 *      lobbys: [] of existing lobbies
 *      loading: boolean
 *
 * Props:
 *      None
 *
 * App -> Intro -> CreateLobbyForm
 *              -> JoinLobbyForm
 *
 */

function Intro() {
    console.debug("Entered Intro component")

    const { playerData } = useContext(userContext);
    const [showForm, setShowForm] = useState(
        {
            visibleForm: '',
            greyOverlay: false
        }
    )
    const [lobbys, setLobbys] = useState<Array<LobbyInterface>>(
        []
    )
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();

    // able to access information that was sent along with the navigate from the prior location
    const errorMessage = location.state?.error;

    console.log('errorMessage', errorMessage);
    // console.log("What is loading?", loading);
    // console.log("What is intro form?", showForm);
    console.log("What is lobbys?", lobbys);

    function updateLobbys(lobbysData: any) {
        console.log('Lobby Data', lobbysData);
        setLobbys(() => lobbysData);
        setLoading(() => true);
    }


    useEffect(() => {
        // function onConnect(msg: string) {
        //     getLobbys();
        // }

        function getLobbys() {
            socketIntro.emit('intro_get_lobbys');
        }

        const intervalId = setInterval(getLobbys, 2000);

        // socket.on('connected', onConnect);
        // socket.emit('intro-get-lobbys');
        socketIntro.on('intro-send-lobbys', updateLobbys);

        return () => {
            // socket.off('connected', onConnect);
            socketIntro.off('intro-send-lobbys', updateLobbys);
            clearInterval(intervalId);
        };
    }, []);

    function showCreateLobbyForm() {
        setShowForm(
            {
                ...showForm,
                visibleForm: "create"
            }
        )
    }

    function showJoinLobbyForm() {
        setShowForm(
            {
                ...showForm,
                visibleForm: "join"
            }
        )
    }

    function formCancel() {
        setShowForm(
            {
                ...showForm,
                visibleForm: ""
            }
        )
    }

    function joinLobby(lobbyName: string) {
        navigate(`/lobby/${lobbyName}`);
    }

    let lobbyList;
    if (!loading) {
        lobbyList = <p>Loading...</p>
    } else {
        if (lobbys.length === 0) {
            lobbyList = 'There are currently no open lobbies';
        } else {
            lobbyList = lobbys.map((lobby) =>
                <div key={lobby.lobby_name}>
                    <h5>{lobby.lobby_name} {lobby.curr_players||0}/{lobby.max_players} Players</h5>
                    <button onClick={() => joinLobby(lobby.lobby_name)}>Join</button>
                </div>
            )
        }
    }

    if (!playerData.playerName) {
        return (
            <div>
                <EnterPlayerNameForm />
            </div>
        )
    }

    let form;
    if (showForm.visibleForm === "create") {
        form = <CreateLobbyForm cancel={formCancel} />
    }

    if (showForm.visibleForm === "join") {
        form = <JoinLobbyForm cancel={formCancel} />
    }


    return (
        <div className='Intro'>
            <p>Welcome to Boggle Your Own Brains!</p>
            <h3>
                {errorMessage}
            </h3>
            <button onClick={showCreateLobbyForm}>Create a new lobby!</button>
            <button onClick={showJoinLobbyForm}>Join a lobby!</button>
            {form}
            <div className='Intro-lobby-container'>
                <h3>
                    Open Lobbies:
                </h3>
                {/* TODO: Make lobbyList a component */}
                {lobbyList}
            </div>
        </div>
    )
}

export default Intro;