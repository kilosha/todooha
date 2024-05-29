import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';
import TodosPage from './pages/TodosPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import './App.css';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PrivateRoute><TodosPage /></PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Outlet />
        </div>
    );
}

export default App;
