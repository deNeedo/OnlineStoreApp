import React from 'react';
import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NotificationsProvider, setUpNotifications } from "reapop";

import App from './App';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PasswordReset from './components/PasswordReset';
import Terms from './components/Terms';

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
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="register" element={<Register />} />
                    <Route path="password-reset" element={<PasswordReset/>} />
                    <Route path="terms" element={<Terms/>} />
                </Routes>
            </BrowserRouter>
        </NotificationsProvider>
    </StrictMode>
);
