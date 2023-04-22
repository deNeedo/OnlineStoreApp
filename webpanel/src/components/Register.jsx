import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        
        // logging the inputted data
        console.log(email);
        console.log(pass);
        console.log(name);
        console.log(surname);
        console.log(phone);

        let socket = new WebSocket("ws://localhost:80/app/onlinestore");
        socket.onopen = function(event)
        {
            console.log("Connection established.")
            let message = "client-register-try ".concat(email).concat(" ").concat(pass).concat(" ").concat(name).concat(" ").concat(surname).concat(" ").concat(phone);
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onmessage = function(event)
        {
            if (event.data == "found") {console.log("Register NOT OK");}
            else {console.log("Register OK");}
            let message = "connection-close-try";
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onclose = function(event)
        {
            console.log("Connection closed.");
        };
    }


    return (
        <div className="auth-form-container">
            <span className="welcome-mess">Wecome! </span><span className="wave">👋</span><span className="welcome-mess"> Please register</span>

            <form className="register-form" onSubmit={handelSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type = 'name' placeholder="Name" id='name' name='name' />

                <input value={surname} onChange={(e) => setSurname(e.target.value)} type = 'surname' placeholder="Surname" id='surname' name='surname' />
                
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type='phone' placeholder="Phone number" id='phone' name='phone' />

                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Email" id='email' name='email' />

                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder="Password" id='password' name='password' />

                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have the account? Login here!</button>
        </div>
    )
}