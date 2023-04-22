import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        
        // logging the inputted data
        console.log(email);
        console.log(pass);

        // sending data to server
        let socket = new WebSocket("ws://localhost:80/app/onlinestore");
        socket.onopen = function(event)
        {
            console.log("Connection established.")
            let message = "client-login-try ".concat(email).concat(" ").concat(pass);
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onmessage = function(event)
        {
            if (event.data == "found") {console.log("Login OK");}
            else
            {
                console.log("Login NOT OK");
                let message = "connection-close-try";
                socket.send(message, 0, message.length, 80, "localhost");
            }
        };
        socket.onclose = function(event)
        {
            console.log("Connection closed.");
        };
        
    }

    return (
        <div className="auth-form-container">
            <div className="welcome-mess-box"><span className="welcome-mess">Hello, </span><span className="wave">👋</span><span className="welcome-mess"> please log in</span></div>
            
            <form className="login-form" onSubmit={handelSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Email" id='email' name='email' />

                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder="Password" id='password' name='password' />

                <button type="submit">Log In</button>
            </form>
            <button className="link-btn">Forgot password? Click here to reset!</button>
            
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here!</button>
        </div>

    )
}