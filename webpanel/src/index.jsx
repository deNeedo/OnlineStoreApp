import React from 'react';
import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NotificationsProvider, setUpNotifications } from "reapop";
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import App from './App.jsx';
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from './components/PasswordReset';
import Terms from './components/Terms';
import Home from './components/Home';
import EmployeeLogin from './components/EmpoyeeLogin.jsx';
import EmployeeRegister from './components/EmployeeRegister.jsx';
import CartProvider from './CartContext.jsx';

setUpNotifications({
    defaultProps: {
        position: "top-right",
        dismissible: true,
        dismissAfter: 4000
    }
});

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(HttpApi)
    .init({
    supportedLng: ['en', 'pl'],
    load: 'languageOnly',
    //debug: true,
    detection: {
        order: ['cookie', 'htmlTag', 'querystring', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
        cashes: ['cookie'],
    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: {
        useSuspense: false,
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <CartProvider>
        <StrictMode>
            <NotificationsProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/password-reset" element={<PasswordReset/>} />
                        <Route path="/terms" element={<Terms/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/employee-login" element={<EmployeeLogin/>} />
                        <Route path="/employee-register" element={<EmployeeRegister/>} />
                    </Routes>
                </BrowserRouter>
            </NotificationsProvider>
        </StrictMode>
    </CartProvider>
);
