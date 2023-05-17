import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next'

import homeCss from './css/Home.module.css';
import Header from './Header';
import Footer from './Footer';

export function Home() {
    const { t } = useTranslation();
    const {notifications, dismissNotification} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();

    const [buttons, setButtons] = useState({login: '', register: ''});
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [searchData, setSearchData] = useState({type: 'all', pattern: ''});

    useEffect(() => {getProducts(searchData)}, [searchData])

    const handleInputChange = (e) => {
        setSearchData({type: searchData.type, pattern: e.target.value})
        // getProducts()
    }

    const handleSelectChange = (e) => {
        setSearchData({type: e.target.value, pattern: searchData.pattern})
        // getProducts()
    }

    const getProducts = (e) => {
        let socket = new WebSocket('ws://localhost:80/veggiestore');
        socket.onopen = function()
        {
            let message = 'get-products ' + e.type + ' ' + e.pattern;
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event)
        {
            if (event.data.length == 2) {setError('Sorry. Couldn\'t find what you\'re looking for.');}
            else {setError('');}
            setData(JSON.parse(event.data)); socket.close();
        };
    }

    return ( 
        <div className={homeCss['wrapper']}>
            <Header buttons={buttons} />
            <div className={homeCss['content-box']}>
                <div className={homeCss['search-box']}>
                    <input 
                        type='text' 
                        placeholder={t("search_input")} 
                        className={homeCss['search-input']}
                        onChange={handleInputChange}
                    />

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 115 }}>
                        <InputLabel className={homeCss['type-label']} sx={{ color: '#808080 !important'}}>{t("type_filter")}</InputLabel>
                        <Select id="type_select"
                            sx={{
                                color: '#808080',
                                '.MuiSvgIcon-root ': { fill: '#808080' },
                                ':before': { borderBottom: '2px solid #E5E5E5' },
                                ':after': { borderBottom: '2px solid green' },
                            }}
                            defaultValue={'all'}
                            onChange={handleSelectChange}
                        >
                        <MenuItem value={'all'} sx={{color: '#808080'}}><em>{t("all")}</em></MenuItem>
                        <MenuItem value={'vegetable'} sx={{color: '#808080'}}><em>{t("vegetables")}</em></MenuItem>
                        <MenuItem value={'fruit'} sx={{color: '#808080'}}><em>{t("fruits")}</em></MenuItem>
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
                            <Typography className={homeCss['product-price']} variant='subtitle1'> {t("price")} {item.price}{t("price_end")} </Typography>
                            <Typography className={homeCss['product-quantity']} variant='subtitle1'> {t("quantity")} {item.quantity > 0 ? item.quantity : <span className={homeCss['unavailable']}>{t("unavailable")}</span>} </Typography>
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