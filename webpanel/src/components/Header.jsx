import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';

import headerCss from './css/Header.module.css';
import Logo from '../../img/page-icon.ico';

export function Header({buttons}) {
    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();

    const loginRedirect = () => {
        if (buttons.login == 'Log In') {
            navigate('/login', {state: {buttons: {login: 'Home', register: 'Register'}}});
        }
        else if (buttons.login == 'Home') {
            navigate('/home', {state: {buttons: {login: 'Log In', register: 'Register'}}});
        }
        else if (buttons.login == 'Log Out') {
            notify('Logout correct!', 'success');
            navigate('/', {state: {buttons: {login: 'Log In', register: 'Register'}}});
        }
    }
    const registerRedirect = () => {
        if (buttons.register == 'Register') {
            navigate('/register', {state: {buttons: {login: 'Log In', register: 'Home'}}});
        }
        else if (buttons.register == 'Home') {
            navigate('/home', {state: {buttons: {login: 'Log In', register: 'Register'}}});
        }
    }

    return (
        <nav>
            <div className={headerCss['header']}>
                <div className={headerCss['logo-and-title']}>
                    <img className={headerCss['logo']} src={Logo} alt='Logo' />
                    <span className={headerCss['title']}>Veggie store</span>
                </div>
                <div className={headerCss['components']}>
                    <button onClick={loginRedirect} className={headerCss['link-btn']}>{buttons.login}</button>
                    <button onClick={registerRedirect} className={headerCss['link-btn']}>{buttons.register}</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;