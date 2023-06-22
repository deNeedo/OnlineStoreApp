import React, { useEffect, useState } from 'react';
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

export function Header({props}) {
    const {t} = useTranslation();
    const {notify} = useNotifications();
    const navigate = useNavigate();
    const location = useLocation();

    const loginRedirect = () => {
        if (props.auth == true) {navigate('/', {state: {lang: props.lang, auth: false}}); notify(t("log_out_mess"), 'success');}
        else {navigate('/login', {state: {lang: props.lang, auth: props.auth}})}
    }
    const registerRedirect = () => {
        if (props.auth == true) {notify(t("already_logged_in_mess"), 'info')}
        else {navigate('/register', {state: {lang: props.lang, auth: props.auth}})}
    }
    const homeRedirect = () => {navigate('/home', {state: {lang: props.lang, auth: props.auth}})}
    const handleChange = (e) => {props.setLang(e.target.value);}
    return (
        <nav>
            <div className={headerCss['header']}>
                <div className={headerCss['logo-and-title']}>
                <img onClick={homeRedirect} className={headerCss['logo']} src={Logo} alt='Logo'/>
                <span onClick={homeRedirect} className={headerCss['title']}>{t("site_name")}</span>
                </div>
                <div className={headerCss['nav']}>
                    <button onClick={loginRedirect} className={headerCss['link-btn']}>{props.auth == true ? t("logout_button") : t("login_button")}</button>
                    <button onClick={registerRedirect} className={headerCss['link-btn']}>{t("register_button")}</button>
                    <img onClick={homeRedirect} className={headerCss['icon']} src={CartPNG}/>
                    <img onClick={homeRedirect} className={headerCss['icon']} src={WishPNG}/>
                    <img onClick={homeRedirect} className={headerCss['icon']} src={ProfilePNG}/>

                    <FormControl className={headerCss['form-control']}>
                        <Select className={headerCss['select']} 
                            sx={{ boxShadow: "none", ".MuiOutlinedInput-notchedOutline": { border: 0 }, 
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: 0, }, 
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0, },
                            ".MuiSvgIcon-root": {fill: "white !important",}
                        }}
                        value={props.lang}
                        onChange={handleChange}
                        // label="Age"
                        // inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value={'pl'}><img className={headerCss['flags']} src={PLFlagPNG} onClick={() => i18next.changeLanguage('pl')}/></MenuItem>
                        <MenuItem value={'en'}><img className={headerCss['flags']} src={USFlagPNG} onClick={() => i18next.changeLanguage('en')}/></MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </nav>
    )
}

export default Header;