import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from 'reapop';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

import headerCss from './css/Header.module.css';
import Logo from '../../img/page-icon.ico';
import CartPNG from '../../img/icons8-cart-96.png';
import WishPNG from '../../img/icons8-list-64.png';
import USFlagPNG from '../../img/united-states.png';
import PLFlagPNG from '../../img/poland.png'
import ProfilePNG from '../../img/profile.png'

export function Header({buttons}) {
    const { t } = useTranslation();
    const {notify} = useNotifications();
    const navigate = useNavigate(); 
    const location = useLocation();

    const loginRedirect = () => {
        if (buttons.login == 'Log In') {
            navigate('/login', {state: {buttons: {login: 'Home', register: 'Register'}}});
        }
        else if (buttons.login == 'Home') {
            navigate('/home', {state: {buttons: {login: 'Log In', register: 'Register'}}});
        }
        else if (buttons.login == 'Log Out') {
            notify(t("log_out_mess"), 'success');
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
                <a className={headerCss['a']} href="/home" ><img className={headerCss['logo']} src={Logo} alt='Logo' /></a>
                <a className={headerCss['a']} href="/home"><span className={headerCss['title']}>{t("site_name")}</span></a>
                </div>
                <div className={headerCss['nav']}>
                        <button onClick={loginRedirect} className={headerCss['link-btn']}>{buttons.login}</button>
                        <button onClick={registerRedirect} className={headerCss['link-btn']}>{buttons.register}</button>
                        <a href="/"><img className={headerCss['icon']} src={CartPNG} /></a>
                        <a href="/"><img className={headerCss['icon']} src={WishPNG} /></a>
                        <a href="/"><img className={headerCss['icon']} src={ProfilePNG} /></a>

                        <FormControl className={headerCss['form-control']}>
                            <Select className={headerCss['select']} 
                                sx={{ boxShadow: "none", ".MuiOutlinedInput-notchedOutline": { border: 0 }, 
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: 0, }, 
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0, },
                                ".MuiSvgIcon-root": { fill: "white !important",}
                                }}
                                defaultValue={'en'}
                                // value={age}
                                // onChange={handleChange}
                                label="Age"
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value={'pl'}><img className={headerCss['flags']} src={PLFlagPNG}  onClick={() => i18next.changeLanguage('pl')}/></MenuItem>
                            <MenuItem value={'en'}><img className={headerCss['flags']} src={USFlagPNG} onClick={() => i18next.changeLanguage('en')}/></MenuItem>
                            </Select>
                        </FormControl>


                </div>
            </div>
        </nav>
    )
}

export default Header;