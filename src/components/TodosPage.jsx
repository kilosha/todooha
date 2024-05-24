import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import TodoList from './todosElements/TodoList';
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
                className='logoutLink'>
                Log out
            </Link>
        </TasksProvider>
    );
};

export default TodosPage;
