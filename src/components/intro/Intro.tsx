import React, { useState, useEffect } from "react";
import { useNavigate, Link} from 'react-router-dom';
import CreateLobbyForm from "./CreateLobbyForm";
import JoinLobbyForm from "./JoinLobbyForm";
import { socket } from "../../socket";

interface LobbyInterface {
    "lobby_name": string,
    "curr_players": number,
    "max_players": number,
    "game_length": number,
    "private": boolean,
    "password": string,
    "host": number,
}

/**
 * Show Intro page
 *
 * Props:
 * -
 */

function Intro() {
    const [showForm, setShowForm] = useState(
        {
            visibleForm: '',
            greyOverlay: false
        }
    )

    const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>()

    const [lobbys, setLobbys] = useState<Array<LobbyInterface>>(
        []
    )

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    console.log("What is loading?", loading);
    console.log("What is intro form?", showForm);
    console.log("What is lobbys?", lobbys);

    function updateLobbys(msg: any) {
        console.debug("Entered updateLobbys function")
        console.log(msg);
        setLobbys((prevLobbys) => msg);
        setLoading(() => true);
    }


    useEffect(() => {

        function onConnect(msg: string) {
            console.log(msg);
            getLobbys();
        }

        function getLobbys() {
            socket.emit('intro-get-lobbys');
        }

        if (intervalId === undefined) {
            console.debug("Going to set a new interval");
            let id = setInterval(getLobbys, 2000);
            setIntervalId(id);
        }

        socket.on('connected', onConnect);
        socket.on('intro-send-lobbys', updateLobbys);

        //TODO: think about if best place to change
        sessionStorage.removeItem("playerData")

        return () => {
            socket.off('connected', onConnect);
            socket.off('intro-send-lobbys', updateLobbys);
            clearInterval(intervalId)
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

    function joinLobby(lobbyName:string){
        navigate(`/lobby/${lobbyName}`);
    }

    let form;

    if (showForm.visibleForm === "create") {
        form = <CreateLobbyForm cancel={formCancel} />
    }

    if (showForm.visibleForm === "join") {
        form = <JoinLobbyForm cancel={formCancel} />
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
                    <h5>{lobby.lobby_name} {lobby.curr_players}/{lobby.max_players} Players</h5>
                    <button onClick={()=>joinLobby(lobby.lobby_name)}>Join</button>
                </div>
            )
        }
    }

    return (
        <div className='Intro'>
            <p>Welcome to Boggle Your Own Brains!</p>
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