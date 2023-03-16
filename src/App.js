import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './views/Login';
import Profile from './views/Profile';
import Orders from './views/Orders';
import Register from './views/Register';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={ <Login />} />
                    <Route path="/orders" element={ <Orders />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;