import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import {Grid, Box,Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button';
import { CartContext } from './CartContext';

import homeCss from './css/Home.module.css';
import Header from './Header';
import Footer from './Footer';

export function Home() {
    const {t} = useTranslation();
    const {notifications, dismissNotification} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const [auth, setAuth] = useState();
    const [data, setData] = useState([]);
    const [lang, setLang] = useState('');
    const [error, setError] = useState('');
    const [searchData, setSearchData] = useState({lang: lang, type: 'all', pattern: '', price: '0', order: 'alpha'});

    useEffect(() => {
        if (location.state != null) {setLang(location.state.lang); setAuth(location.state.auth);}
        else {setLang('en'); setAuth(false);}
    }, [])
    useEffect(() => {setSearchData({lang: lang, type: searchData.type, pattern: searchData.pattern, price: searchData.price, order: searchData.order})}, [lang])
    useEffect(() => {getProducts(searchData)}, [searchData])

    const handleInputChange = (e) => {
        setSearchData({lang: lang, type: searchData.type, pattern: e.target.value, price: searchData.price, order: searchData.order})
    }

    const handleSelectChange = (e) => {
        setSearchData({lang: lang, type: e.target.value, pattern: searchData.pattern, price: searchData.price, order: searchData.order})
    }

    const handleSelect2Change = (e) => {
        setSearchData({lang: lang, type: searchData.type, pattern: searchData.pattern, price: e.target.value, order: searchData.order})
    }

    const handleSelect3Change = (e) => {
        setSearchData({lang: lang, type: searchData.type, pattern: searchData.pattern, price: searchData.price, order: e.target.value})
    }

    const getProducts = (e) => {
        let socket = new WebSocket('ws://localhost:80/veggiestore');
        socket.onopen = function()
        {
            let message = 'get-products ' + e.lang + ' ' +  e.type + ' ' + e.price + ' ' + e.order + ' ' + e.pattern;
            socket.send(message, 0, message.length, 80, 'localhost');
        };
        socket.onmessage = function(event)
        {
            if (event.data.length == 2) {setError('Sorry. Couldn\'t find what you\'re looking for.');}
            else {setError('');}
            setData(JSON.parse(event.data)); socket.close();
        };
    }

    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(data.id_item);

    return (
        <div className={homeCss['wrapper']}>
            <Header props={{setLang, lang, setAuth, auth}} />
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
                        <Select
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

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel className={homeCss['type-label']} sx={{ color: '#808080 !important'}}>{t("price_filter")}</InputLabel>
                        <Select
                            sx={{
                                color: '#808080',
                                '.MuiSvgIcon-root ': { fill: '#808080' },
                                ':before': { borderBottom: '2px solid #E5E5E5' },
                                ':after': { borderBottom: '2px solid green' },
                            }}
                            defaultValue={'0'}
                            onChange={handleSelect2Change}
                        >
                        <MenuItem value={'0'} sx={{color: '#808080'}}><em>{t("price_one")}</em></MenuItem>
                        <MenuItem value={'1'} sx={{color: '#808080'}}><em>{t("price_two")}</em></MenuItem>
                        <MenuItem value={'2'} sx={{color: '#808080'}}><em>{t("price_three")}</em></MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                        <InputLabel className={homeCss['type-label']} sx={{ color: '#808080 !important'}}>{t("order_filter")}</InputLabel>
                        <Select
                            sx={{
                                color: '#808080',
                                '.MuiSvgIcon-root ': { fill: '#808080' },
                                ':before': { borderBottom: '2px solid #E5E5E5' },
                                ':after': { borderBottom: '2px solid green' },
                            }}
                            defaultValue={'alpha'}
                            onChange={handleSelect3Change}
                        >
                        <MenuItem value={'alpha'} sx={{color: '#808080'}}><em>{t("order_one")}</em></MenuItem>
                        <MenuItem value={'price'} sx={{color: '#808080'}}><em>{t("order_two")}</em></MenuItem>
                        </Select>
                    </FormControl>


                </div>
                <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                
                <Grid container className={error ? homeCss['hide-products-container'] : homeCss['products-container']}  sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    {data.map((item) => (
                        <Grid item key={item.id_item} className={homeCss['product-box']}>
                            <Typography className={homeCss['product-name']} variant='h5'> {lang == "en" ? item.item_name : item.polish_name} </Typography>
                            <hr className={homeCss['hr']}></hr>
                            <Box className={homeCss['product-img']} component='img' src={item.photo}></Box>
                            <hr className={homeCss['hr']}></hr>
                            <Typography className={homeCss['product-price']} variant='subtitle1'> {t("price")} {item.price}{t("price_end")} </Typography>
                            <Typography className={homeCss['product-quantity']} variant='subtitle1'> {t("quantity")} {item.quantity > 0 ? item.quantity : <span className={homeCss['unavailable']}>{t("unavailable")}</span>} </Typography>
                            <hr className={homeCss['hr']}></hr>
                            <div className={homeCss['button-conatiner']}>
                            <Button variant="contained" className={homeCss['add-to-cart']} onClick={() => cart.AddOneToCart(item.id_item)}>Add to cart</Button>
                            <Button variant="contained" className={homeCss['add-to-wishlist']}>Add to wishlist</Button>
                            </div>
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