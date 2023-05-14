import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';

import homeCss from './css/Home.module.css';
import Header from './Header';
import Footer from './Footer';

export function Home() {

    const {notifications, dismissNotification} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    
    const [buttons, setButtons] = useState({login: '', register: ''});
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state == null) {setButtons({login: 'Log In', register: 'Register'});}
        else {setButtons(location.state.buttons)}
        let socket = new WebSocket('ws://localhost:80/veggiestore');
        socket.onopen = function()
        {
            let message = 'get-products ';
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event)
        {
            setData(JSON.parse(event.data));
            let message = 'connection-close-try';
            socket.send(message, 0, message.length, 80, 'localhost');
        };
    }, [])

    const onInputChange = (e) => {
        let socket = new WebSocket('ws://localhost:80/veggiestore');
        socket.onopen = function()
        {
            let message = 'get-products ' + e.target.value;
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event)
        {
            if (event.data.length == 2) {setError('Sorry. Couldn\'t find what you\'re looking for.');}
            else {setError('');}
            setData(JSON.parse(event.data));
            let message = 'connection-close-try';
            socket.send(message, 0, message.length, 80, 'localhost');
        };
    }
    
    return ( 
        <div className={homeCss['wrapper']}>
            <Header buttons={buttons} />
            <div className={homeCss['content-box']}>
                <input 
                    type='text' 
                    placeholder='Search for Your favorite vegetables and fruits...' 
                    className={homeCss['search-input']}
                    onChange={onInputChange}
                />
                <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                <Grid container className={homeCss['products-container']} sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    {data.map((item) => (
                        <Grid item key={item.id_item} className={homeCss['product-box']}>
                            <Typography className={homeCss['product-name']} variant='h5'> {item.item_name} </Typography>
                            <Box className={homeCss['product-img']} component='img' src={item.photo}></Box>
                            <Typography className={homeCss['product-price']} variant='subtitle1'> Price: ${item.price} </Typography>
                            <Typography className={homeCss['product-quantity']} variant='subtitle1'> Quantity: {item.quantity} </Typography>
                        </Grid>
                    ))}
                    <p> {error} </p>
                </Grid>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;