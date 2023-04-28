import React from "react";
import { useNavigate } from 'react-router-dom';
import passCss from './css/PasswordReset.module.css'

const PasswordReset = () => {

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}
    
    return ( 
        <div className={passCss['wrapper']}>
            <div className={passCss['content-box']}>
                <p className={passCss["message"]}>Reset password site</p>

                <button className={passCss['gologin-button']} onClick = {loginRedirect} > Back to login page </button>
            </div>
        </div>
        );
};

export default PasswordReset;