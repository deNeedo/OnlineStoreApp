import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TermsCss from './css/Terms.module.css';
import Header from './Header';
import Footer from './Footer';

export function Orders() {
    const {notifications, dismissNotification, notify} = useNotifications();
    const navigate = useNavigate(); const location = useLocation();
    const [lang, setLang] = useState(location.state.lang);
    const [auth, setAuth] = useState(location.state.auth);
    const [orders, setOrders] = useState([]);

    const get_orders = () => {
        let socket = new WebSocket('ws://localhost:80/veggiestore'); let message;
        socket.onopen = function() {
            message = 'get-orders';
            socket.send(message, 0, message.length, 80, 'localhost');
        }
        socket.onmessage = function(event) {
            let arr = event.data.split("\n")
            setOrders(arr);
            console.log(event.data)
            socket.close();
        };
    }
    return (
        
        <div onLoad={get_orders} className={TermsCss['wrapper']}>
            <Header props={{setLang, lang, setAuth, auth}} />
                <button onClick={get_orders}> REFRESH </button>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Data</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Price</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {orders.map((order) => ( <TableRow>
                <TableCell align="right">{order.split(" ")[0]}</TableCell>
                <TableCell align="right">{order.split(" ")[1]}</TableCell>
                <TableCell align="right">{order.split(" ")[2]}</TableCell>
                <TableCell align="right">{order.split(" ")[3]}</TableCell>
                <TableCell align="right">{order.split(" ")[4]}</TableCell>
                <TableCell align="right">{order.split(" ")[5]}</TableCell>
                </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Footer/>
        </div>
    )
};

export default Orders;