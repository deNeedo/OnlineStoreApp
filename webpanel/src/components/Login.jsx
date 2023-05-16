import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';

import loginCss from './css/Login.module.css';
import Header from './Header';
import Footer from './Footer';

export function Login() {

    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();

    const [buttons, setButtons] = useState({login: '', register: ''});
    const [input, setInput] = useState({email: '', pass: ''});  
    const [error, setError] = useState({email: '', pass: ''});

    const registerRedirect = () => {
        navigate('/register', {state: {buttons: {login: 'Log In', register: 'Home'}}});
    }
    const forgotPassRedirect = () => {
        navigate('/password-reset', {state: {buttons: {login: 'Log In', register: 'Home'}}});
    }

    useEffect(() => {
        if (location.state == null) {setButtons({login: 'Home', register: 'Register'});}
        else {setButtons(location.state.buttons)}
    }, [])

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
                    stateObj[name] = 'Please enter email.';
                }
                break;
    
            case 'pass':
            if (!value) {
                stateObj[name] = 'Please enter Password.';
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
                notify('Login correct!', 'success');
                navigate('/home', {state: {buttons: {login: 'Log Out', register: 'Register'}}});
            }
            else if (event.data == 'error') {notify('Email or Password are invalid', 'error');}
            socket.send('connection-close-try', 0, 'connection-close-try'.length, 80, 'localhost');
        };
    }
    const isEnabled = input.email.length > 0 & input.pass.length > 0;

    return (
        <div className={loginCss['wrapper']}>
            <Header buttons={buttons}/>
            <div className={loginCss['content-box']}>
                <div className={loginCss['auth-form-container']}>

                    <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>

                    <div className={loginCss['welcome-mess-box']}><span className={loginCss['welcome-mess']}>Hello, </span><span className='wave'>👋</span><span className={loginCss['welcome-mess']}> please log in</span></div>
                        
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
                                placeholder='Password' 
                                value={input.pass} 
                                onChange={onInputChange}
                                onBlur={validateInput}></input>
                            {error.pass && <span className='err'>{error.pass}</span>}

                            <button className={isEnabled == true ? 'active-btn' : 'inactive-btn'}  disabled={!isEnabled} type='submit'>Log In</button>
                    </form>
                        
                    <button className='link-btn' onClick={forgotPassRedirect}>Forgot password? Click here to reset!</button>
                        
                    <button className='link-btn' onClick={registerRedirect}>Don't have an account? Register here!</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default Login;