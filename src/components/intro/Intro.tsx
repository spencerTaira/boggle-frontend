import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import CreateLobbyForm from "./CreateLobbyForm";
import JoinLobbyForm from "./JoinLobbyForm";
import './Intro.css'
import LobbyList from "./LobbyList";
import { socketIntro } from "../../socket";

/**
 * Render Intro Component
 *
 * State:
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

    useEffect(function turnOnSocket(){
        socketIntro.connect()

        return ()=>{
            console.info("closing socketIntro")
            socketIntro.disconnect()
        }

    }, []);

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
                <div className="Intro-lobbys">
                    <LobbyList/>
                </div>
            </div>
        </div>
    )
}

export default Intro;