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
    const order_arr = [];

    function createData(email, item, quantity, data, time, price) {
        return { email, item, quantity, data, time, price };
      }
      
    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];

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
                {/* {orders.map((order) => (order))} */}

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
                {/* {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                ))} */}
                </TableBody>
            </Table>
            </TableContainer>

            <Footer/>
        </div>
    )
};

export default Orders;