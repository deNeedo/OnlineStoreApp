import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import { useTranslation } from 'react-i18next'

import registerCss from './css/Register.module.css';
import Header from './Header';
import Footer from './Footer';

export function Register() {
    const { t } = useTranslation();
    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const loginRedirect = () => {navigate('/login');}
    const termsRedirect = () => {navigate('/terms');}
    const [lang, setLang] = useState('');

    const [input, setInput] = useState({
        email: '',
        pass: '',
        confirmPass: '',
        name: '',
        surname: '',
        phone: ''
        });

    const [error, setError] = useState({
        email: '',
        pass: '',
        confirmPass: '',
        name: '',
        surname: '',
        phone: ''
        })

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

        let caps, small, num, specialSymbol;

        switch (name) {
            case 'name':
                if (!value) {
                    stateObj[name] = t("name_err");
                }
                break;

            case 'surname':
                if (!value) {
                    stateObj[name] = t("surname_err");   
                }
                break;

            case 'phone':
                if (!value) {
                    stateObj[name] = t("phone_err");
                }
                break;

            case 'email':
                if (!value) {
                    stateObj[name] = t("email_err");
                }
                break;

            case 'pass':
                if (input.pass.length < 8) {
                    stateObj[name] = t("pass_req");
                }
                else {
                    caps = (input.pass.match(/[A-Z]/g) || []).length;
                    small = (input.pass.match(/[a-z]/g) || []).length;
                    num = (input.pass.match(/[0-9]/g) || []).length;
                    specialSymbol = (input.pass.match(/\W/g) || []).length;
                    if (caps < 1) {
                        stateObj[name] = t("upper_case_err");
                        break;
                    }
                    else if (small < 1) {
                        stateObj[name] = t("lower_case_err");
                        break;
                    }
                    else if (num < 1) {
                        stateObj[name] = t("num_case_err");
                        break;
                    }
                    else if (specialSymbol < 1) {
                        stateObj[name] = t("symbol_err");
                        break;
                    }
                }
                break;

            case 'confirmPass':
                if (!value) {
                    stateObj[name] = t("pass_conf_err");
                }
                else if (input.pass && value !== input.pass) {
                    stateObj[name] = t("no_same_err");
                }
                break;

            default:
            break;
        }

        return stateObj;
        });
    }

    const [agreement, setAgreement] = useState(false);

    const handleChange = (event) => {
      setAgreement(event.target.checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let socket = new WebSocket('ws://localhost:80/veggiestore');
        socket.onopen = function()
        {
            let message = 'client-register-try '.concat(input.email).concat(' ').concat(input.pass).concat(' ').concat(input.name).concat(' ').concat(input.surname).concat(' ').concat(input.phone);
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event)
        {
            if (event.data == 'error') {notify(t("email_in_use_mess"), 'error');}
            else
            {
                notify(t("register_success_mess"), 'success');
                navigate('/login')
            }
            let message = 'connection-close-try';
            socket.send(message, 0, message.length, 80, 'localhost');
        };
    }

    const isEnabled = input.name.length > 0 & input.surname.length > 0 & input.phone.length > 0 & input.email.length > 0 & input.pass.length > 0 & input.confirmPass.length > 0 & input.pass == input.confirmPass & agreement;
    
    return (
        <div className={registerCss['wrapper']}>
            <Header/>
            <div className={registerCss['content-box']}>
                <div className={registerCss['auth-form-container']}>

                    <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>

                    <div className={registerCss['welcome-mess-box']}>
                        <span className={registerCss['welcome-mess']}> {t("register_welcome")} </span><span className='wave'>👋</span><span className={registerCss['welcome-mess']}> {t("register_welcome2")}</span>
                    </div>
                        
                    <form className={registerCss['register-form']} onSubmit={handleSubmit}>
                        <input 
                            type='name'
                            name='name'
                            id='name'
                            placeholder= {t("name_placeholder")}
                            onChange={onInputChange}
                            onBlur={validateInput}></input>
                        {error.name && <span className='err'>{error.name}</span>}
                            
                        <input
                            type='surname'
                            name='surname'
                            id='surname'
                            placeholder={t("surname_placeholder")}
                            onChange={onInputChange}
                            onBlur={validateInput}></input>
                        {error.surname && <span className='err'>{error.surname}</span>}

                        <input
                            type='phone'
                            name='phone'
                            id='phone'
                            placeholder={t("phone_placeholder")}
                            onChange={onInputChange}
                            onBlur={validateInput}></input>
                        {error.phone && <span className='err'>{error.phone}</span>}

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

                        <input 
                            type='password' 
                            name='confirmPass'
                            id='confirmPass'
                            placeholder={t("re_type_pass_placeholder")}
                            value={input.confirmPass}
                            onChange={onInputChange}
                            onBlur={validateInput}></input>
                        {error.confirmPass && <span className='err'>{error.confirmPass}</span>}  

                        <div className={registerCss['terms']}>
                            <input
                                type='checkbox'
                                name='agreement'
                                onChange={handleChange}
                                /> {t("terms1")} <button className={registerCss['terms-btn']} onClick={termsRedirect}> {t("terms2")} </button>
                        </div>
                        <button className={isEnabled == true ? 'active-btn' : 'inactive-btn'}  disabled={!isEnabled} type='submit'> {t("register")} </button>
                    </form>
                    <button className='link-btn' onClick={loginRedirect}> {t("already_acc")} </button>      
                </div>   
            </div>
            <Footer/>
        </div> 
    )
};

export default Register;