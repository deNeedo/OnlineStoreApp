import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from 'reapop';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import ConstructionIcon from '@mui/icons-material/Construction';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import headerCss from './css/Header.module.css';
import Logo from '../../img/page-icon.ico';
import CartPNG from '../../img/icons8-cart-96.png';
import WishPNG from '../../img/icons8-list-64.png';
import USFlagPNG from '../../img/united-states.png';
import PLFlagPNG from '../../img/poland.png'
import ProfilePNG from '../../img/profile.png'
import { DialogContent } from '@mui/material';

export function Header({props}) {
    const {t} = useTranslation();
    const {notify} = useNotifications();
    const navigate = useNavigate();
    const location = useLocation();

    const loginRedirect = () => {
        if (props.auth == true) {navigate('/', {state: {lang: props.lang, auth: false}}); notify(t("log_out_mess"), 'success');}
        else {navigate('/login', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }
    const registerRedirect = () => {
        if (props.auth == true) {notify(t("already_logged_in_mess"), 'info')}
        else {navigate('/register', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }
    const employeeLoginRedirect = () => {
        if (props.auth == true) {navigate('/', {state: {lang: props.lang, auth: false}}); notify(t("log_out_mess"), 'success');}
        else {navigate('/employee-login', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }
    const employeeRegisterRedirect = () => {
        if (props.auth == true) {notify(t("already_logged_in_mess"), 'info')}
        else {navigate('/employee-register', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }

    const homeRedirect = () => {navigate('/home', {state: {lang: props.lang, auth: props.auth}})}
    const handleChange = (e) => {props.setLang(e.target.value);}


    
    const StyledMenu = styled((props) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
          color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: theme.palette.text.secondary,
              marginRight: theme.spacing(1.5),
            },
            '&:active': {
              backgroundColor: alpha(
                theme.palette.success.dark,
                theme.palette.action.selectedOpacity,
              ),
            },
          },
        },
      }));
      
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };


        const [anchorEl2, setAnchorEl2] = React.useState(null);
        const open2 = Boolean(anchorEl2);
        const handleClick2 = (event) => {
          setAnchorEl2(event.currentTarget);
        };
        const handleClose2 = () => {
          setAnchorEl2(null);
        };


    return (
        <nav>
            <div className={headerCss['header']}>
                <div className={headerCss['logo-and-title']}>
                <img onClick={homeRedirect} className={headerCss['logo']} src={Logo} alt='Logo'/>
                <span onClick={homeRedirect} className={headerCss['title']}>{t("site_name")}</span>
                </div>
                <div className={headerCss['nav']}>

                <div className={headerCss['register-box']}>
                <Button
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {t("register")}
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={registerRedirect} disableRipple>
                    <PersonIcon />
                    {t("customer_register")}
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={employeeRegisterRedirect} disableRipple>
                    <ConstructionIcon />
                    {t("employee_register")}
                    </MenuItem>
                </StyledMenu>
                </div>

                <div className={headerCss['login-box']}>
                <Button
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    onClick={handleClick2}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    {t("login")}
                </Button>
                <StyledMenu
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleClose2}
                >
                    <MenuItem onClick={loginRedirect} disableRipple>
                    <PersonIcon />
                    {t("customer_account")}
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={employeeLoginRedirect} disableRipple>
                    <ConstructionIcon />
                    {t("employee_account")}
                    </MenuItem>
                </StyledMenu>
                </div>

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