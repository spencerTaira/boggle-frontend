import React, { useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
import BoggleApi from "../../api";
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

    const navigate = useNavigate();
    console.log("what is formData?", formData)

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        console.debug("Entered handle submit");
        try {
            const result = await BoggleApi.enterRoom(formData);
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
        cancel()
    }

    return(
        <div className='JoinGameForm'>
            <p>Join a game!</p>
            <div>
                <button onClick={cancelForm}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='JoinGameForm-roomName'>
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
        </div>
    )
}

export default JoinGameForm;