import React from "react";

const Dashboard = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("test")
        // let message = "connection-close-try";
        // socket.send(message, 0, message.length, 80, "localhost");
    }
    
    return ( 
        <div>
            <p>You have successfully logged in!</p>

            <button onClick = {handleSubmit} >Back to login page</button>
        </div>

        );
};

export default Dashboard;