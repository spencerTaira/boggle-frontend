import React, { ReactEventHandler, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import BoggleApi from "../../api";

/**
 * Render CreateLobbyForm.
 *
 * State: formData
 *  {
 *      lobbyName (string),
 *      password (string),
 *      numPlayers (string),
 *      gameLength (string)
 *  }
 *
 * Props:
 *      cancel: callback function to close form
 *
 * App -> CreateLobbyForm -> Lobby
 */

function CreateLobbyForm({cancel}:{cancel:Function}) {
    console.debug("Entered CreateLobbyForm");

    const [formData, setFormData] = useState(
        {
            lobbyName: '',
            password: '',
            maxPlayers: '2',
            gameLength: '1'
        }
    );
    const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
    const navigate = useNavigate();

    console.log("what is formData?", formData)

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const result = await BoggleApi.createLobby(formData);

        if (result.error) {
            setErrorMessages(() => [result.error]);
        } else {
            navigate(`/lobby/${result.lobbyInfo.lobbyName}`);
        }
    }

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
         }));
    }

    function cancelForm(){
        cancel()
    }

    return(
        <div className='CreateLobbyForm'>
            <p>Create a new lobby!</p>
            <div>
                <button onClick={cancelForm}>X</button>
            </div>
            <div>
                {errorMessages.map((msg, i) => <h4 style= {{ "color": "red" }} key={i}>{msg}</h4>)}
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Lobby Name
                    <input
                        type="text"
                        value={formData.lobbyName}
                        name="lobbyName"
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="text"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Number of players
                    <input
                        type="range"
                        min='1'
                        max='10'
                        step='1'
                        name="maxPlayers"
                        value={formData.maxPlayers}
                        onChange={handleChange}
                    />
                    <p>{formData.maxPlayers}</p>
                </label>
                <label>
                    Length of Game
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step=".5"
                        name="gameLength"
                        value={formData.gameLength}
                        onChange={handleChange}
                    />
                    {
                        Number(formData.gameLength)%1===0 ?
                        <p>{formData.gameLength}:00 min.</p>:
                        <p>{Number(formData.gameLength)-.5}:30 min.</p>
                    }
                </label>
                <button>
                    Create Lobby!
                </button>
            </form>
        </div>
    )
}

export default CreateLobbyForm;
