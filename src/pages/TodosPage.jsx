import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import TodoList from '../components/todosElements/TodoList.jsx';
import withLogger from '../components/withLogger.jsx';

const TodosPage = () => {
    const LoggedTodoList = withLogger(TodoList);

    const handleLogoutPress = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
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
