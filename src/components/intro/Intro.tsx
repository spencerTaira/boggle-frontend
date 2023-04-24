import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CreateLobbyForm from "./CreateLobbyForm";
import JoinLobbyForm from "./JoinLobbyForm";
import { socketIntro } from "../../socket";
import './Intro.css'
import { IntroLobbyInterface } from "../../interfaces";
import LobbyList from "./LobbyList";
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
    
    const location = useLocation();

    // able to access information that was sent along with the navigate from the prior location
    const errorMessage = location.state?.error;

    console.log('errorMessage', errorMessage);

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
                    <LobbyList/>
                </div>
            </div>
        </div>
    )
}

export default Intro;