import React from "react";
import { useNavigate } from 'react-router-dom';
import dashboardCss from './css/Dashboard.module.css';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";


const Dashboard = () => {

    const { notifications, dismissNotification, notify } = useNotifications();

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

            {/* // * Notification setup */}
            <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
            
                <p className={dashboardCss["welcome-mess"]}>Welcome to the Dashboard</p>

                <button className={dashboardCss['logout-button']} onClick = {function(event){ loginRedirect(); notify("You have been logged out.", 'info')}} > Log out </button>

            </div>
        </div>


        );
};

export default Dashboard;