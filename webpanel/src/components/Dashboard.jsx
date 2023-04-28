import React from "react";
import { useNavigate } from 'react-router-dom';
import dashboardCss from './css/Dashboard.module.css'


const Dashboard = () => {

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}

    const handleSubmit = (e) => {
        e.preventDefault();
        // let message = "connection-close-try";
        // socket.send(message, 0, message.length, 80, "localhost");
    }
    
    return ( 
        <div className={dashboardCss['wrapper']}>
            <div className={dashboardCss['content-box']}>
                <p className={dashboardCss["welcome-mess"]}>Welcome to the Dashboard</p>
                <p>You have successfully logged in!</p>

                <button className={dashboardCss['logout-button']} onClick = {loginRedirect} > Log out </button>
            </div>
        </div>


        );
};

export default Dashboard;