import React, { useState } from "react";

export const Login = (props) => {
    const [input, setInput] = useState({
        email: '',
        pass: ''
        });
        
    const [error, setError] = useState({
        email: '',
        pass: ''
        })
        
    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
        ...prev,
        [name]: value
        }));
        validateInput(e);
    }
    
    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
        const stateObj = { ...prev, [name]: "" };
    
        switch (name) {           
            case "email":
                if (!value) {
                    stateObj[name] = "Please enter email.";
                }
                break;
    
            case "pass":
            if (!value) {
                stateObj[name] = "Please enter Password.";
            } 
            break;
        }
    
        return stateObj;
        });
    }


    const handelSubmit = (e) => {
        e.preventDefault();
        
        // * Logging data in console
        console.log(input.email);
        console.log(input.pass);

        // * Sending data to server
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

    const isEnabled = input.email.length > 0 & input.pass.length > 0;

return (
    <div className="auth-form-container">
        <div className="welcome-mess-box"><span className="welcome-mess">Hello, </span><span className="wave">👋</span><span className="welcome-mess"> please log in</span></div>
            
        <form className="login-form" onSubmit={handelSubmit}>
            <input 
                     type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={onInputChange}
                    onBlur={validateInput}></input>
                {error.email && <span className='err'>{error.email}</span>}

                <input 
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password" 
                    value={input.pass} 
                    onChange={onInputChange}
                    onBlur={validateInput}></input>
                {error.pass && <span className='err'>{error.pass}</span>}

                <button className={isEnabled == true ? 'active-btn' : 'inactive-btn'}  disabled={!isEnabled} type="submit">Log In</button>
        </form>
            
        <button className="link-btn">Forgot password? Click here to reset!</button>
            
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here!</button>
    </div>
)}