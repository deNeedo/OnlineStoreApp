import React from 'react';
import Logo from '../../img/page-icon.ico';
import headerCss from './css/Header.module.css';
import {NavLink, Link} from 'react-router-dom';

const Header = () => {

    return (
        <nav>
            <div className={headerCss['header']}>
                <img className={headerCss['logo']} src={Logo} alt="Logo" />
                <div className={headerCss['components']}>
                <NavLink to="/login" className={headerCss['link-btn']}>Login</NavLink>

                </div>
            </div>
        </nav>
    )
}

export default Header;