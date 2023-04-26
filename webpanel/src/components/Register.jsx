import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

export const Register = (props) => {

    const navigate = useNavigate();
    const routeChange = () => {navigate('/success');}

    const [input, setInput] = useState({
        email: '',
        pass: '',
        confirmPass: '',
        name: '',
        surname: '',
        phone: ''
        });
            
    const [error, setError] = useState({
        email: '',
        pass: '',
        confirmPass: '',
        name: '',
        surname: '',
        phone: ''
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

        let caps, small, num, specialSymbol;
        
        switch (name) {
            case "name":
                if (!value) {
                    stateObj[name] = "Please enter name.";
                }
                break;

            case "surname":
                if (!value) {
                    stateObj[name] = "Please enter surname.";   
                }
                break;

            case "phone":
                if (!value) {
                    stateObj[name] = "Please enter phone number.";
                }
                break;

            case "email":
                if (!value) {
                    stateObj[name] = "Please enter email.";
                }
                break;
        
            case "pass":
                if (input.pass.length < 8) {
                        stateObj[name] = "Password should contain minimum 8 characters, one uppercase, lowercase, number and special character: @$!%*?&";
                } else {
                    caps = (input.pass.match(/[A-Z]/g) || []).length;
                    small = (input.pass.match(/[a-z]/g) || []).length;
                    num = (input.pass.match(/[0-9]/g) || []).length;
                    specialSymbol = (input.pass.match(/\W/g) || []).length;
                    if (caps < 1) {
                        stateObj[name] = "Must add one UPPERCASE letter";
                      break;
                    } else if (small < 1) {
                        stateObj[name] = "Must add one lowercase letter";
                      break;
                    } else if (num < 1) {
                        stateObj[name] = "Must add one number";
                      break;
                    } else if (specialSymbol < 1) {
                        stateObj[name] = "Must add one special symbol: @$! % * ? &";
                      break;
                    }
                  }
                break;
        
            case "confirmPass":
                if (!value) {
                    stateObj[name] = "Please enter Confirm Password.";
                } else if (input.pass && value !== input.pass) {
                    stateObj[name] = "Passwords do not match!";
                }
                break;
        
            default:
            break;
        }
        
        return stateObj;
        });
    }

    const [agreement, setAgreement] = useState(false);

    const handleChange = (event) => {
      setAgreement(event.target.checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            
        // * Logging data in console
        console.log(input.email);
        console.log(input.pass);
        console.log(input.name);
        console.log(input.surname);
        console.log(input.phone);

        let socket = new WebSocket("ws://localhost:80/app/onlinestore");
        socket.onopen = function(event)
        {
            console.log("Connection established.")
            let message = "client-register-try ".concat(input.email).concat(" ").concat(input.pass).concat(" ").concat(input.name).concat(" ").concat(input.surname).concat(" ").concat(input.phone);
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onmessage = function(event)
        {
            if (event.data == "found") {console.log("Register NOT OK");}
            else
            {
                console.log("Register OK");
                return routeChange();
            }
            let message = "connection-close-try";
            socket.send(message, 0, message.length, 80, "localhost");
        };
        socket.onclose = function(event)
        {
            console.log("Connection closed.");
        };
    }


    const isEnabled = input.name.length > 0 & input.surname.length > 0 & input.phone.length > 0 & input.email.length > 0 & input.pass.length > 0 & input.confirmPass.length > 0 & input.pass == input.confirmPass & agreement;

   
    
return (
    <div className="auth-form-container">
        <span className="welcome-mess"> Welcome! </span><span className="wave">👋</span><span className="welcome-mess"> Please register</span>

            
        <form className="register-form" onSubmit={handleSubmit}>
            <input 
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onInputChange}
                onBlur={validateInput}></input>
            {error.name && <span className='err'>{error.name}</span>}
                
            <input
                type="surname"
                name="surname"
                id="surname"
                placeholder="Surname"
                onChange={onInputChange}
                onBlur={validateInput}></input>
            {error.surname && <span className='err'>{error.surname}</span>}

            <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="Phone"
                onChange={onInputChange}
                onBlur={validateInput}></input>
            {error.phone && <span className='err'>{error.phone}</span>}

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

            <input 
                type="password" 
                name="confirmPass"
                id="confirmPass"
                placeholder="Retype Password"
                value={input.confirmPass}
                onChange={onInputChange}
                onBlur={validateInput}></input>
            {error.confirmPass && <span className='err'>{error.confirmPass}</span>}  


            <div className="terms">
                <input
                    type="checkbox"
                    name="agreement"
                    onChange={handleChange}
                    /> I agree to the terms and conditions
            </div>

            <button className={isEnabled == true ? 'active-btn' : 'inactive-btn'}  disabled={!isEnabled} type="submit"  /*onClick={routeChange}*/>Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have the account? Login here!</button>      
    </div>    
)}

export default Register;