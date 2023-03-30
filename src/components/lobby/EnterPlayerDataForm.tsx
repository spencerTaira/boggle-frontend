import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoggleApi from "../../api";
import userContext from "../../userContext";

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

function EnterPlayerDataForm({ lobbyId }: { lobbyId: string }) {
    const navigate = useNavigate();
    const { updatePlayerData } = useContext(userContext)
    const [formData, setFormData] = useState(
        {
            playerName: '',
            lobbyId: lobbyId
        }
    )

    console.log("what is Lobby EPDF formData?", formData)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.debug("EPDF Entered handle submit");
        const result = await BoggleApi.joinLobby(formData);

        if (result.error) {
            navigate(
                '/',
                {
                    state: {
                        error: result.error
                    }
                }
            );
        }


        updatePlayerData(result.playerData);
    }

    return (
        <div className="EnterPlayerDataForm">
            <p>
                Enter username!
            </p>
            <form onSubmit={handleSubmit}>
                <div className='EnterPlayerDataForm-form'>
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
