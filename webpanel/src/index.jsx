import React from 'react';
import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NotificationsProvider, setUpNotifications } from "reapop";

import App from './App';
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from './components/PasswordReset';
import Terms from './components/Terms';
import Home from './components/Home';

const root = ReactDOM.createRoot(document.getElementById("root"));

setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    dismissAfter: 4000
  }
});

root.render(
    <StrictMode>
        <NotificationsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>}/>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="password-reset" element={<PasswordReset/>} />
                    <Route path="terms" element={<Terms/>} />
                    <Route path="home" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </NotificationsProvider>
    </StrictMode>
);
