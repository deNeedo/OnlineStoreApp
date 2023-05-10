import React from "react";
import { useNavigate } from 'react-router-dom';
import passCss from './css/PasswordReset.module.css'
import Header from "./Header";
import Footer from "./Footer";

const PasswordReset = () => {

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}
    
    return ( 
        <div className={passCss['wrapper']}>
            <Header/>
            
            <div className={passCss['content-box']}>
                <p className={passCss['message']}>Reset password site</p>

                <button className={passCss['gologin-button']} onClick = {loginRedirect} > Back to login page </button>
            </div>

            <Footer/>
        </div>
        );
};

export default PasswordReset;