import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';
import { useTranslation } from 'react-i18next'

import footerCss from './css/Footer.module.css';

export function Footer() {

    const {t} = useTranslation();

    return (
        <footer>
            <div className={footerCss['contact-info']}>
                <span className={footerCss['contact']}> {t("contact_info")} <a href='mailto:admin@veggie-store.com'> admin@veggie-store.com </a></span> 
            </div>
        </footer>
    )
}

export default Footer;