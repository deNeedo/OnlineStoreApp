import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import homeCss from './css/Home.module.css';
import Header from './Header';
import Footer from "./Footer";

export const Home = () => {

    const { notifications, dismissNotification, notify } = useNotifications();
    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}
    const [data, setData] = useState([]);

    useEffect(() => {
        let socket = new WebSocket("ws://localhost:80/app/onlinestore");
        socket.onopen = function()
        {
            let message = "get-products ";
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onmessage = function(event)
        {
            setData(JSON.parse(event.data));
            let message = "connection-close-try";
            socket.send(message, 0, message.length, 80, "localhost");
        };
    }, [])

    const onInputChange = e => {
        let socket = new WebSocket("ws://localhost:80/app/onlinestore");
        socket.onopen = function()
        {
            let message = "get-products " + e.target.value;
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onmessage = function(event)
        {
            setData(JSON.parse(event.data));
            let message = "connection-close-try";
            socket.send(message, 0, message.length, 80, "localhost");
        };
    }
    
    return ( 
        <div className={homeCss['wrapper']}>
            <Header/>
            
            <div className={homeCss['content-box']}>
                <input 
                        type="text" 
                        placeholder="Search for Your favorite vegetables and fruits" 
                        className={homeCss["search-input"]}
                        onChange={onInputChange}
                    />

            <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                

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
                <button className={homeCss['logout-btn']} onClick={function() {loginRedirect(); notify("You have been logged out.", 'info')}}> Log out </button>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;