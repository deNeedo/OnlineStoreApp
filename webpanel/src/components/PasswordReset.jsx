import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';

import passCss from './css/PasswordReset.module.css'
import Header from './Header';
import Footer from './Footer';

export function PasswordReset() {

    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const [lang, setLang] = useState(location.state.lang);
    const [auth, setAuth] = useState(location.state.auth);

    return ( 
        <div className={passCss['wrapper']}>
            <Header props={{setLang, lang, setAuth, auth}} />
            <div className={passCss['content-box']}>
                <p className={passCss['message']}> Reset password site </p>
            </div>
            <Footer/>
        </div>
    );
};

export default PasswordReset;