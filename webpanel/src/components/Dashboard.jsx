import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();

    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");

    if (loggedInUser) {
        setauthenticated(loggedInUser);
    }
}, []);

if (!authenticated) {
    return navigate('/login');
    } else {
        return (
            <div>
                <p>Welcome to your Dashboard</p>
            </div>
            );
    }
};

export default Dashboard;