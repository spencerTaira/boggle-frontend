import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import BoggleApi from "../../api";
import userContext from "../../userContext";

function EnterPasswordForm({id}:{id:string}){
    const {updatePlayerData} = useContext(userContext);
    return <div>{id}</div>
}

export default EnterPasswordForm;