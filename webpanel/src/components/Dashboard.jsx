import React from "react";
import { useNavigate } from 'react-router-dom';
import dashboardCss from './css/Dashboard.module.css';
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";

const Dashboard = () => {

    const { notifications, dismissNotification, notify } = useNotifications();

    const navigate = useNavigate();
    const loginRedirect = () => {navigate('/login');}
    
    return ( 
        <div className={dashboardCss['wrapper']}>
            <div className={dashboardCss['content-box']}>
            <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={atalhoTheme}/>
                <p className={dashboardCss["welcome-mess"]}>Welcome to the Dashboard</p>
                <button className={dashboardCss['logout-button']} onClick={function() {loginRedirect(); notify("You have been logged out.", 'info')}}> Log out </button>
            </div>
        </div>
    );
};

export default Dashboard;