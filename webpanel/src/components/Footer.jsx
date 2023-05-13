import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';

import footerCss from './css/Footer.module.css';

export function Footer() {

    return (
        <footer>
            <div className={footerCss['contact-info']}>
                <span className={footerCss['contact']}>Contact: <a href='mailto:admin@veggie-store.com'> admin@veggie-store.com </a> </span> 
            </div>
        </footer>
    )
}

export default Footer;