import React, { ReactEventHandler, useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
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
 * App -> CreateLobbyForm
 */

function CreateLobbyForm({cancel}:{cancel:Function}) {
    const [formData, setFormData] = useState(
        {
            lobbyName: '',
            password: '',
            maxPlayers: '2',
            gameLength: '1'
        }
    );

    const navigate = useNavigate();
    console.log("what is formData?", formData)




    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        console.debug("Entered handle submit");
        try {
            const result = await BoggleApi.createLobby(formData);
            console.log(result);
            navigate(`/lobby/${result.lobbyInfo.lobbyName}`);
            console.log("success, result is", result);
         }
         catch (err) {
            //console.log("err>>>>>>>>>>>>", err);
            //setErrors(err.message)
            console.log(err);
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
        console.log("form cancelled");
        cancel()
    }

    return(
        <div className='CreateLobbyForm'>
            <p>Create a new lobby!</p>
            <div>
                <button onClick={cancelForm}>X</button>
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
