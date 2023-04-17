import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import BoggleApi from "../../api";
import userContext from "../../userContext";

function EnterPasswordForm({id}:{id:string}){
    const {playerData, updatePlayerData} = useContext(userContext);
    const [formData, setFormData] = useState(
        {
            lobbyName:id,
            password: ''
        }
    )
    const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
    const navigate = useNavigate();

    function cancelForm(){
        navigate('/');
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        const result = await BoggleApi.authenticate(
            formData
        );
        if (result.error) {
            setErrorMessages(() => [result.error])
        } else {
            updatePlayerData({
                currLobby: result.lobbyName
            });
        }
    }

    return (
        <div className='EnterPasswordForm'>
            <p>Enter lobby password!</p>
            <div>
                {errorMessages.map((msg, i) => <h4 style={{ "color": "red" }} key={i}>{msg}</h4>)}
            </div>
            <div>
                <button onClick={cancelForm}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='EnterPasswordForm-lobbyName'>
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
                        Submit!
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EnterPasswordForm;