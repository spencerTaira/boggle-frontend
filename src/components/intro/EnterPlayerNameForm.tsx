import React, { useState, useContext } from "react";
import BoggleApi from "../../api";
import userContext from "../../userContext";

/**
 * Render EnterPlayerNameForm
 *
 * State: formData
 *  {
 *      playerName: (string)
 *  }
 *
 * App -> Lobby -> EnterPlayerNameForm
 */

function EnterPlayerNameForm() {
    console.debug("EnterPlayerNameForm");

    const { updatePlayerData } = useContext(userContext)
    const [formData, setFormData] = useState(
        {
            playerName: '',
        }
    )
    const [error, setError] = useState('');

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
        const result = await BoggleApi.createPlayer(formData);

        if (result.error) {
            setError(result.error)
        } else {
            updatePlayerData(result.playerData);
        }

    }

    return (
        <div className="EnterPlayerNameForm">
            <p>
                Enter username!
            </p>
            <div>
                <h4 style={{ "color": "red" }}>{error}</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='EnterPlayerNameForm-form'>
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

export default EnterPlayerNameForm;
