import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import homeCss from './css/Home.module.css';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import Header from './Header';

export const Home = () => {


    const { notifications, dismissNotification, notify } = useNotifications();
    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}
    
    const [data, setData] = useState([]);

    const onInputChange = e => {
        let socket = new WebSocket("ws://localhost:80/app/onlinestore");
        socket.onopen = function()
        {
            let message = "get-products";
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onmessage = function(event)
        {
            setData(JSON.parse(event.data)); // data from the server displayed in console
        };

    }


    return ( 
        <div className={homeCss['wrapper']}>
                <Header/>
            <div className={homeCss['content-box']}>

                <input 
                        type="text" 
                        placeholder="Search for Your favorite vegetables and fruits..." 
                        className={homeCss["search-input"]} 
                        onChange={(e) => onInputChange()} 
                    />

            <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                
                <p className={homeCss["welcome-mess"]}>Welcome to the Home page</p>

                {/* {<Table data={data}/>} */}

                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                            {data.map((item) => (
                        <tr key={item.id_item}>
                            <td> {item.item_name} </td>
                            <td> {item.type} </td>
                        </tr>
                            ))}
                    </tbody>
                </table>

                <button className={homeCss['logout-button']} onClick={function() {loginRedirect(); notify("You have been logged out.", 'info')}}> Log out </button>
            </div>
        </div>
    );
}

export default Home;