import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/page-icon.ico';
import headerCss from './css/Header.module.css';

const Header = () => {

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}

    return (
        <nav>
            <div className={headerCss['header']}>
                <div className={headerCss['logo-and-title']}>
                    <img className={headerCss['logo']} src={Logo} alt="Logo" />
                    <span className={headerCss['title']}>Veggie store</span>
                </div>

                <div className={headerCss['components']}>
                <button onClick={loginRedirect} className={headerCss['link-btn']}>Log In</button>

                </div>
            </div>
        </nav>
    )
}

export default Header;