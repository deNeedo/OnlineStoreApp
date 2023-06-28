import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';

import TermsCss from './css/Terms.module.css';
import Header from './Header';
import Footer from './Footer';

export function Terms() {
    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const [lang, setLang] = useState(location.state.lang);
    const [auth, setAuth] = useState(location.state.auth);

    return ( 
        <div className={TermsCss['wrapper']}>
            <Header props={{setLang, lang, setAuth, auth}} />
               
            <Footer/>
        </div>
    )
};

export default Terms;