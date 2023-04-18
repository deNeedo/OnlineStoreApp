import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        
        // * Now only logging the inputted data
        console.log(email);
        console.log(pass);
        console.log(name);
        console.log(surname);
    }


    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handelSubmit}>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type = 'name' placeholder="Name" id='name' name='name' />

                <label htmlFor="surname">Surname</label>
                <input value={surname} onChange={(e) => setSurname(e.target.value)} type = 'surname' placeholder="Surname" id='surname' name='surname' />
                
                <label htmlFor="phone">Phone number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type='phone' placeholder="Phone number" id='phone' name='phone' />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Email" id='email' name='email' />

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder="Password" id='password' name='password' />

                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have the account? Login here!</button>
        </div>
    )
}