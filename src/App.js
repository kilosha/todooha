import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import TodosPage from './components/TodosPage';

import './App.css';


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PrivateRoute><TodosPage /></PrivateRoute>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
            </Routes>
            <Outlet />
        </div>
    );
}

export default App;
