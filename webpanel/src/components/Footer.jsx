import React from 'react';
import footerCss from './css/Footer.module.css';


const Footer = () => {

    return (
        <footer>
                <div className={footerCss['contact-info']}>
                    <span className={footerCss['contact']}>Contact: </span><a href="mailto:admin@veggie-store.com">admin@veggie-store.com</a>
                    </div>
        </footer>
    )
}

export default Footer;