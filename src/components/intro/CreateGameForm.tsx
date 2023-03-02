import React, { ReactEventHandler, useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
import BoggleApi from "../../api";

/**
 * Render CreateGameForm.
 *
 * State: formData
 *  {
 *      roomName (string),
 *      password (string),
 *      numPlayers (string),
 *      gameLength (string)
 *  }
 *
 * App -> CreateGameForm
 */

function CreateGameForm({cancel}:{cancel:Function}) {
    const [formData, setFormData] = useState(
        {
            roomName: '',
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
            const result = await BoggleApi.createRoom(formData);
            console.log(result);
            navigate(`/lobby/${result.roomName}`);
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
        <div className='CreateGameForm'>
            <p>Create a new game!</p>
            <div>
                <button onClick={cancelForm}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Room Name
                    <input
                        type="text"
                        value={formData.roomName}
                        name="roomName"
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
                    Create room!
                </button>
            </form>

        </div>
    )
}

export default CreateGameForm;

//Name of room
//Number of players
//Length of game?