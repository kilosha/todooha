import React, { useEffect } from 'react';
import axios from 'axios';

import TasksContext from '../contexts/TasksContext.js';

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);
    const [isTasksLoading, setIsTasksLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const addNewTask = (task) => {
        const sToken = sessionStorage.getItem('token') || localStorage.getItem('token');

        setIsTasksLoading(true);
        setError("");

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/todos`,
                { title: task },
                {
                    headers: {
                        'Authorization': 'Bearer ' + sToken,
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => [...tasks, response.data]);
            })
            .catch(function (error) {
                const errMessage =
                    error?.response?.data?.message ||
                    'Unexpected error occured. Please, try again later';
                console.log(error);
                setError(errMessage);
            }).finally(() => setIsTasksLoading(false));
    }

    const deleteTask = (id) => {
        const sToken = sessionStorage.getItem('token') || localStorage.getItem('token');

        setIsTasksLoading(true);
        setError("");

        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + sToken,
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => tasks.filter(task => task.id !== response.data.id));
            })
            .catch(function (error) {
                const errMessage =
                    error?.response?.data?.message ||
                    'Unexpected error occured. Please, try again later';
                console.log(error);
                setError(errMessage);
            }).finally(() => setIsTasksLoading(false));
    }

    const updateTask = (id, newText) => {
        const sToken = sessionStorage.getItem('token') || localStorage.getItem('token');

        setIsTasksLoading(true);
        setError("");

        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, { title: newText },
                {
                    headers: {
                        Authorization: 'Bearer ' + sToken,
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => tasks.map(task =>
                    task.id === response.data.id ? response.data : task
                ))
            })
            .catch(function (error) {
                const errMessage =
                    error?.response?.data?.message ||
                    'Unexpected error occured. Please, try again later';
                console.log(error);
                setError(errMessage);
            }).finally(() => setIsTasksLoading(false));
    }

    const completeTask = (id) => {
        const sToken = sessionStorage.getItem('token') || localStorage.getItem('token');

        setIsTasksLoading(true);
        setError("");

        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}/isCompleted`, undefined,
                {
                    headers: {
                        Authorization: 'Bearer ' + sToken,
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => tasks.map(task =>
                    task.id === response.data[0].id ? response.data[0] : task
                ))
            })
            .catch(function (error) {
                const errMessage =
                    error?.response?.data?.message ||
                    'Unexpected error occured. Please, try again later';
                console.log(error);
                setError(errMessage);
            }).finally(() => setIsTasksLoading(false));
    }

    useEffect(() => {
        const sToken = sessionStorage.getItem('token') || localStorage.getItem('token');

        setIsTasksLoading(true);
        setError("");

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
                headers: {
                    'Authorization': 'Bearer ' + sToken
                }
            })
            .then(function (response) {
                setTasks(response.data);
            })
            .catch(function (error) {
                const errMessage =
                    error?.response?.data?.message ||
                    'Unexpected error occured. Please, try again later';
                console.log(error);
                setError(errMessage);
            }).finally(() => setIsTasksLoading(false));
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask, completeTask, isTasksLoading, error, setError }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;