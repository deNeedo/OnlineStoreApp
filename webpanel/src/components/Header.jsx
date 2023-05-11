import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsSystem, { atalhoTheme, useNotifications } from 'reapop';
import Logo from '../../img/page-icon.ico';
import headerCss from './css/Header.module.css';

export default function Header({text}) {
    const { notify } = useNotifications();
    const navigate = useNavigate();
    const loginRedirect = () => {
        if (text == "Log In")
        {
            // let socket = new WebSocket("ws://localhost:80/veggiestore");
            // socket.onopen = function()
            // {
            //     let message = "set-session";
            //     socket.send(message, 0, message.length, 80, "localhost");
            // };
            // socket.onmessage = function()
            // {
            //     let message = "connection-close-try";
            //     socket.send(message, 0, message.length, 80, "localhost");
            // };
            navigate('/login', {state: {text: "Home"}});
        }
        else if (text == "Home")
        {
            navigate('/home', {state: {text: "Log In"}});
        }
        else if (text == "Log Out")
        {
            notify("Logout correct!", "success")
            navigate('/', {state: {text: "Log In"}});
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
                <button onClick={loginRedirect} className={headerCss['link-btn']}>{text}</button>

                </div>
            </div>
        </nav>
    )
}
