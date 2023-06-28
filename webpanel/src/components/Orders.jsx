import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';

import TermsCss from './css/Terms.module.css';
import Header from './Header';
import Footer from './Footer';

export function Orders() {
    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const [lang, setLang] = useState(location.state.lang);
    const [auth, setAuth] = useState(location.state.auth);
    const [orders, setOrders] = useState([]);
    const order_arr = [];

    const get_orders = () => {
        let socket = new WebSocket('ws://localhost:80/veggiestore'); let message;
        socket.onopen = function() {
            message = 'get-orders';
            socket.send(message, 0, message.length, 80, 'localhost');
        }
        socket.onmessage = function(event) {
            let arr = event.data.split("\n")
            setOrders(arr); socket.close();
        };
    }
    return (
        
        <div onLoad={get_orders} className={TermsCss['wrapper']}>
            <Header props={{setLang, lang, setAuth, auth}} />
                <button onClick={get_orders}> REFRESH </button>
                {orders.map((order) => (order))}
            <Footer/>
        </div>
    )
};

export default Orders;