import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TasksProvider from './providers/TasksProvider.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <TasksProvider>
            <App />
        </TasksProvider>
    </React.StrictMode>
);
