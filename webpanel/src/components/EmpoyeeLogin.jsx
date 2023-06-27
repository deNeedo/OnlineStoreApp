import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import loginCss from './css/Login.module.css';
import Header from './Header';
import Footer from './Footer';

export function Login() {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const {t} = useTranslation();
    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const [input, setInput] = useState({email: '', pass: ''});  
    const [error, setError] = useState({email: '', pass: ''});
    const [lang, setLang] = useState(location.state.lang);
    const [auth, setAuth] = useState(location.state.auth);

    const registerRedirect = () => {navigate('/register', {state: {lang: lang, auth: auth}})}
    const forgotPassRedirect = () => {navigate('/password-reset', {state: {lang: lang, auth: auth}})}

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
        ...prev,
        [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
        const stateObj = { ...prev, [name]: '' };
            switch (name) {           
                case 'email':
                    if (!value) {
                        stateObj[name] = t("email_err");
                    }
                    break;
        
                case 'pass':
                if (!value) {
                    stateObj[name] = t("pass_err");
                } 
                break;
            }
            return stateObj;
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let socket = new WebSocket('ws://localhost:80/veggiestore'); let message;
        socket.onopen = function()
        {
            message = 'client-login-try '.concat(input.email).concat(' ').concat(input.pass);
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event)
        {
            if (event.data == 'success')
            {
                message = 'session create '.concat(input.email);
                socket.send(message, 0, message.length, 80, 'localhost');
                notify(t("login_correct_mess"), 'success');
                navigate('/home', {state: {lang: lang, auth: true}})
            }
            else if (event.data == 'error') {notify(t("email_pass_err_mess"), 'error');}
            socket.send('connection-close-try', 0, 'connection-close-try'.length, 80, 'localhost');
        };
    }
    const isEnabled = input.email.length > 0 & input.pass.length > 0;

    return (
        <div className={loginCss['wrapper']}>
            <Header props={{setLang, lang, setAuth, auth}} />
            <div className={loginCss['content-box']}>
                <div className={loginCss['auth-form-container']}>
                    <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                    <div className={loginCss['welcome-mess-box']}><span className={loginCss['welcome-mess']}> {t("login_hello_employee")} </span><span className='wave'>👋</span><span className={loginCss['welcome-mess']}> {t("login_hello2")}</span></div>
                    <form className={loginCss['login-form']} onSubmit={handleSubmit}>
                        <input 
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Email'
                                onChange={onInputChange}
                                onBlur={validateInput}></input>
                            {error.email && <span className='err'>{error.email}</span>}

                            <input 
                                type='password'
                                name='pass'
                                id='pass'
                                placeholder={t("pass_placeholder")} 
                                value={input.pass} 
                                onChange={onInputChange}
                                onBlur={validateInput}></input>
                            {error.pass && <span className='err'>{error.pass}</span>}

                            <button className={isEnabled == true ? 'active-btn' : 'inactive-btn'}  disabled={!isEnabled} type='submit'>{t("login_btn")}</button>
                    </form>
                    <button className='link-btn' onClick={forgotPassRedirect}>{t("forgot_pass")}</button>
                    <button className='link-btn' onClick={registerRedirect}>{t("no_acc")}</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default Login;