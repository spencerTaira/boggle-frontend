import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CreateLobbyForm from "./CreateLobbyForm";
import JoinLobbyForm from "./JoinLobbyForm";
import { socketIntro } from "../../socket";
import './Intro.css'
import { IntroLobbyInterface } from "../../interfaces";

/**
 * Render Intro Component
 *
 * State:
 *      lobbys: [{
 *          'lobby_name': string,
 *          'curr_players': number,
 *          'max_players': number
 *      }, ...]
 *
 *      loading: boolean
 *
 *      showForm: {
 *          visibleForm: '',
            greyOverlay: false
 *      }
 *
 * Props:
 *      None
 *
 * App -> Intro -> CreateLobbyForm
 *              -> JoinLobbyForm
 *
 */

function Intro() {
    console.debug("Entered Intro component");

    const [showForm, setShowForm] = useState(
        {
            visibleForm: '',
            greyOverlay: false
        }
    );
    const [lobbys, setLobbys] = useState<Array<IntroLobbyInterface>>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // able to access information that was sent along with the navigate from the prior location
    const errorMessage = location.state?.error;

    console.log('errorMessage', errorMessage);
    console.log("What is lobbys?", lobbys);

    function updateLobbys(lobbysData: any) {
        console.log('Lobby Data', lobbysData);
        setLobbys(() => lobbysData);
        setLoading(() => true);
    }


    useEffect(() => {
        function getLobbys() {
            socketIntro.emit('intro_get_lobbys');
        }

        const intervalId = setInterval(getLobbys, 2000);

        socketIntro.on('intro-send-lobbys', updateLobbys);

        return () => {
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
        );
    }

    function showJoinLobbyForm() {
        setShowForm(
            {
                ...showForm,
                visibleForm: "join"
            }
        );
    }

    function formCancel() {
        setShowForm(
            {
                ...showForm,
                visibleForm: ""
            }
        );
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
                <div key={lobby.lobby_name} className='Intro-lobby'>

                    <span className="lobby-name"><h4>{lobby.lobby_name}</h4></span>
                    <span className="curr-players"> {lobby.curr_players||0}
                        <span className="max-players">/{lobby.max_players} Players</span>
                    </span>

                    <button
                        className="join-button"
                        onClick={() => joinLobby(lobby.lobby_name)}
                    >
                        Join
                    </button>
                </div>
            )
        }
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
            <div className="Intro-information">
            <p className="Intro-title">Welcome to Boggle Your Own Brains!</p>
                <h3>
                    {errorMessage}
                </h3>
                <button
                    onClick={showCreateLobbyForm}
                    className="Intro-button"
                >
                    Create a new lobby!
                </button>
                <button
                    onClick={showJoinLobbyForm}
                    className="Intro-button"
                >
                    Join a lobby!
                </button>
                {form}
            </div>
            <div className='Intro-lobbys-container'>
                <h3>
                    Open Lobbies:
                </h3>
                <div className="Intro-lobbys">{/* TODO: Make lobbyList a component */}
                    {lobbyList}
                </div>
            </div>
        </div>
    )
}

export default Intro;