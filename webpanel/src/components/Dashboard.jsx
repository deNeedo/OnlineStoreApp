import React from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const routeChange = () => {navigate('/login');}

    const handleSubmit = (e) => {
        e.preventDefault();
        // let message = "connection-close-try";
        // socket.send(message, 0, message.length, 80, "localhost");
        routeChange();
        
    }
    
    return ( 
        <div>
            <p>You have successfully logged in!</p>

            <button onClick = {handleSubmit} > Log out </button>
        </div>

        );
};

export default Dashboard;