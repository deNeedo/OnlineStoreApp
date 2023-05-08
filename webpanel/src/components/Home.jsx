import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import homeCss from './css/Home.module.css';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import { Products } from "../vegetables";

const Home = () => {

    const { notifications, dismissNotification, notify } = useNotifications();

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}

    const [query, setQuery] = useState("");

    return ( 
        <div className={homeCss['wrapper']}>
            <div className={homeCss['content-box']}>
                <div className={homeCss['search-box']}>
                <input 
                        type="text" 
                        placeholder="Search for Your favorite vegetables and fruits" 
                        className={homeCss["search-input"]} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                </div>

            <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                
                <p className={homeCss["welcome-mess"]}>Welcome to the Home page</p>
                <ul className="list">
                    {Products.filter((product) =>
                        product.name.toLowerCase().includes(query)
                    ).map((product) => (
                        <li key={product.id} className="list-item">
                            {product.name}
                        </li>
                    ))}
                </ul>

                <button className={homeCss['logout-button']} onClick={function() {loginRedirect(); notify("You have been logged out.", 'info')}}> Log out </button>
            </div>
        </div>
    );
}

export default Home;