import React, { ReactEventHandler, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

/**
 * Render CreateGameForm.
 * 
 * State: formData
 *  {
 *      roomName,
 *      numPlayers
 *      gameLength
 *  }
 * 
 * App -> CreateGameForm
 */

function CreateGameForm({cancel}:{cancel:Function}) {
    const [formData, setFormData] = useState(
        {
            roomName: '',
            numPlayers: '2',
            gameLength: '1'
        }
    );
    
    console.log("what is formData?", formData)
    
    function handleSubmit(e:React.FormEvent){
        e.preventDefault();
       
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
        <div className='CreateGameForm'>
            <label>
                <p>Create a new game!</p>
                <form onSubmit={handleSubmit}>
                    <div className='CreateGameForm-roomName'>
                        <button onClick={cancelForm}>X</button>
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
                            Number of players
                            <input
                                type="range"
                                min='1'
                                max='10'
                                step='1'
                                name="numPlayers"
                                value={formData.numPlayers}
                                onChange={handleChange}
                            />
                            <p>{formData.numPlayers}</p>
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
                        <button onSubmit={handleSubmit}>
                            Create room!
                        </button>
                    </div>
                </form>
            </label>
        </div>
    )
}

export default CreateGameForm;

//Name of room
//Number of players
//Length of game?