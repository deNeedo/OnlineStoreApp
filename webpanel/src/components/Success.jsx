import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 


const Success = () => {

    // const navigate = useNavigate();
    // const routeChange = () =>{ 
    //     navigate('/login');
    //   }
    
    
    return (
        <div>
            <p>You have successfully registered!</p>

            {/* <button onClick={routeChange}>Back to login page</button> */}
        </div>
        );
    };
export default Success;