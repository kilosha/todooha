import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import TodoList from './TodoList';
import withLogger from './withLogger';

import TasksProvider from '../providers/TasksProvider.js';

const TodosPage = () => {
    const LoggedTodoList = withLogger(TodoList);

    const handleLogoutPress = () => {
        localStorage.removeItem('token');
    };

    return (
        <TasksProvider>
            <LoggedTodoList />
            <Link
                to="/todooha/login"
                onClick={handleLogoutPress}
                component={Typography.Link}
                style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    letterSpacing: '1px',
                    display: 'block',
                    color: 'white',
                    marginTop: '20px',
                }}>
                Log out
            </Link>
        </TasksProvider>
    );
};

export default TodosPage;
