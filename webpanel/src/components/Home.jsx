import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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
        else {setButtons(location.state.buttons);}
        let socket = new WebSocket('ws://localhost:80/veggiestore');
        socket.onopen = function()
        {
            let message = 'get-products ';
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event) {setData(JSON.parse(event.data)); socket.close();};
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
            setData(JSON.parse(event.data)); socket.close();
        };
    }

    const handleInputChange = () => {


    }

    return ( 
        <div className={homeCss['wrapper']}>
            <Header buttons={buttons} />
            <div className={homeCss['content-box']}>
                <div className={homeCss['search-box']}>
                    <input 
                        type='text' 
                        placeholder='Search for Your favorite vegetables and fruits...' 
                        className={homeCss['search-input']}
                        onChange={onInputChange}
                    />

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 115 }}>
                        <InputLabel className={homeCss['type-label']} sx={{ color: '#808080 !important'}}>Type</InputLabel>
                        <Select
                            sx={{
                                color: '#808080',
                                '.MuiSvgIcon-root ': { fill: '#808080' },
                                ':before': { borderBottom: '2px solid #E5E5E5' },
                                ':after': { borderBottom: '2px solid green' },

                            }}
                            defaultValue={'all'}
                            //value={all}
                            // onChange={handleInputChange}
                        >
                        <MenuItem value={'all'} sx={{color: '#808080'}}><em>All</em></MenuItem>
                        <MenuItem value={'vegetable'} sx={{color: '#808080'}}><em>Vegetables</em></MenuItem>
                        <MenuItem value={'fruit'} sx={{color: '#808080'}}><em>Fruits</em></MenuItem>
                         </Select>
                    </FormControl>


                </div>
                <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                <Grid container className={error ? homeCss['hide-products-container'] : homeCss['products-container']}  sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    {data.map((item) => (
                        <Grid item key={item.id_item} className={homeCss['product-box']}>
                            <Typography className={homeCss['product-name']} variant='h5'> {item.item_name} </Typography>
                            <hr className={homeCss['hr']}></hr>
                            <Box className={homeCss['product-img']} component='img' src={item.photo}></Box>
                            <hr className={homeCss['hr']}></hr>
                            <Typography className={homeCss['product-price']} variant='subtitle1'> Price: ${item.price} </Typography>
                            <Typography className={homeCss['product-quantity']} variant='subtitle1'> Quantity: {item.quantity > 0 ? item.quantity : <span className={homeCss['unavailable']}>Unavailable</span>} </Typography>
                        </Grid>
                    ))}
                </Grid>

                <p className={homeCss['err']}> {error} </p>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;