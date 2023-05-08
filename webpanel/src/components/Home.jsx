import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import homeCss from './css/Home.module.css';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import axios from 'axios';
import Table from "./Table";

const Home = () => {

    const { notifications, dismissNotification, notify } = useNotifications();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
          const res = await axios.get("http://localhost:5000");
          setData(res.data);
          setLoading(false);
        };
        fetchProducts();
      }, []);

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

                {<Table data={data}/>}

                <button className={homeCss['logout-button']} onClick={function() {loginRedirect(); notify("You have been logged out.", 'info')}}> Log out </button>
            </div>
        </div>
    );
}

export default Home;