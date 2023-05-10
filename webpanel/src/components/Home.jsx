import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import homeCss from './css/Home.module.css';
import Header from './Header';
import Footer from "./Footer";

import { Grid, Box,Typography} from '@mui/material';

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
                        type='text' 
                        placeholder='Search for Your favorite vegetables and fruits...' 
                        className={homeCss['search-input']}
                        onChange={onInputChange}
                    />

            <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                
                
                    <Grid container  className={homeCss['products-container']} sx={{display: 'grid',gap: 3,gridTemplateColumns: 'repeat(3, 1fr)',}}>
                    {data.map((item) => (
                        <Grid item key={item.id_item} className={homeCss['product-box']}>
                            <Box
                                className={homeCss['product-img']}
                                component='img'                                     
                                src={item.photo}
                                
                            ></Box>
                            <hr color='#e0e0e0'></hr>
                            <Typography className={homeCss['product-name']}>{item.item_name}
                            </Typography>
                            <Typography className={homeCss['product-price']}>${item.price}
                            </Typography>
                            <Typography className={homeCss['product-price']}>Quantity: {item.quantity}
                            </Typography>
                            {console.log(item.photo)}
                        </Grid>

                        ))}
                    </Grid>

                <button className={homeCss['logout-btn']} onClick={function() {loginRedirect(); notify('You have been logged out.', 'info')}}> Log out </button>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;