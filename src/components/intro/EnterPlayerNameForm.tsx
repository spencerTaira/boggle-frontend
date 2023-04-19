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
 * App -> EnterPlayerNameForm
 */

function EnterPlayerNameForm() {
    console.debug("EnterPlayerNameForm");

    const { updatePlayerData, setPlayerId } = useContext(userContext)
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
        const result = await BoggleApi.createPlayer(formData);
        if (result.error) {
            setError(result.error)
        } else {
            updatePlayerData(result.playerData);
            setPlayerId(result.playerData.playerId);
        }

    }

    return (
        <div className="EnterPlayerNameForm">
            <p>
                Enter name!
            </p>
            <div>
                <h4 style={{ "color": "red" }}>{error}</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='EnterPlayerNameForm-form'>
                    <label>
                        Name:
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
