import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        
        // * Now only logging the inputted data
        console.log(email);
        console.log(pass);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handelSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Email" id='email' name='email' />

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder="Password" id='password' name='password' />

                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here!</button>
        </div>

    )
}