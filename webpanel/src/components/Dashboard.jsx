import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";

export const Dashboard = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test")
    }
    return ( 
        <div>
            <p>You have successfully logged in!</p>

            {<button type="submit" onSubmit={handleSubmit}>Back to login page</button>}
            
        </div>
        );
};

export default Dashboard;