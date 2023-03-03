import React, { useState }from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoggleApi from "../../api";

/**
 * Render EnterPlayerDataForm
 *
 * State: formData
 *  {
 *      playerName: (string)
 *  }
 *
 * App -> Lobby -> EnterPlayerDataForm
 */

function EnterPlayerDataForm({roomId}:{roomId:string}){
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            playerName:'',
            roomName:roomId
        }
    )

    console.log("what is Lobby EPDF formData?", formData)

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
         }));
    }

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        console.debug("Entered handle submit");
        try {
            // const result = await BoggleApi.joinRoom(formData);
            // console.log(result);
            // //navigate(`/lobby/${result.roomName}`);
            //console.log("success, result is", result);
         }
         catch (err) {
            //console.log("err>>>>>>>>>>>>", err);
            //setErrors(err.message)
            console.log(err);
         }
    }
    return (
        <div>
            <p>
                Enter username!
            </p>
            <form onSubmit={handleSubmit}>
                <div className='JoinGameForm-roomName'>
                    <label>
                        Username
                        <input
                            type="text"
                            value={formData.playerName}
                            name="playerName"
                            onChange={handleChange}
                            maxLength={50}
                            required
                        />
                    </label>
                    <button>
                        Create Name
                    </button>
                </div>
            </form>
        </div>
    )

}

export default EnterPlayerDataForm;
