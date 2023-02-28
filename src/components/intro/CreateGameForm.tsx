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

function CreateGameForm() {
    const [formData, setFormData] = useState(
        {
            roomName: '',
            numPlayers: 2,
            gameLength: 1
        }
    );
    
    console.log("what is formData?", formData)
    
    function handleSubmit(){
       
    }
    
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
         }));
    }
    return(
        <div className='CreateGameForm'>
            <label>
                <p>Create a new game!</p>
                <form onSubmit={handleSubmit}>
                    <div className='CreateGameForm-roomName'>
                        <label>
                            Room Name
                            <input
                                type="text"
                                value={formData.roomName}
                                name="roomName"
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Number of players
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
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
                            <p>{formData.gameLength}</p>
                        </label>
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