import React from "react";
import { useNavigate } from 'react-router-dom';
import successCss from './css/Success.module.css'

const Success = () => {

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}
    
    return (
        <div className={successCss['wrapper']}>
            <div className={successCss['content-box']}>
                <p className={successCss["message"]}>You have successfully registered!</p>

                <button className={successCss['gologin-button']} onClick = {loginRedirect} > Go to login page </button>
            </div>
        </div>
        );
    };

export default Success;