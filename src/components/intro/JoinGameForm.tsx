import React, { useState, } from "react";

/**
 * Render JoinGameForm.
 *
 * State: formData
 *  {
 *      roomName (string),
 *      password (string)
 *  }
 *
 * App -> JoinGameForm
 */

function JoinGameForm({cancel}:{cancel:Function}) {
    const [formData, setFormData] = useState(
        {
            roomName: '',
            password: '',
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
                            Password
                            <input
                                type="text"
                                value={formData.password}
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button onSubmit={handleSubmit}>
                            Join room!
                        </button>
                    </div>
                </form>
            </label>
        </div>
    )
}

export default JoinGameForm;