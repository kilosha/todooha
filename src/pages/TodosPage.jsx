import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';

import TodoList from '../components/todosElements/TodoList.jsx';
import withLogger from '../components/withLogger.jsx';

import { todosServiceApi } from '../services/todosServiceApi.js';

const TodosPage = () => {
    const LoggedTodoList = withLogger(TodoList);
    const dispatch = useDispatch();

    const handleLogoutPress = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        dispatch(todosServiceApi.util.resetApiState());
    };

    return (
        <>
            <LoggedTodoList />
            <Link
                to="/login"
                onClick={handleLogoutPress}
                component={Typography.Link}
                className="logoutLink">
                Log out
            </Link>
        </>
    );
};

export default TodosPage;
