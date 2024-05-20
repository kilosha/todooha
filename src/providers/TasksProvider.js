import React, { useEffect } from 'react';
import axios from 'axios';

import TasksContext from '../contexts/TasksContext.js';

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);

    const addNewTask = (task) => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/todos`,
                { title: task },
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => [...tasks, response.data]);
            })
            .catch(function (error) {
                alert('Something went wrong :(');
                console.log(error);
            });
    }

    const deleteTask = (id) => {
        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => tasks.filter(task => task.id !== response.data.id));
            })
            .catch(function (error) {
                alert('Something went wrong :(');
                console.log(error);
            });
    }

    const updateTask = (id, newText) => {
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, { title: newText },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => tasks.map(task =>
                    task.id === response.data.id ? response.data : task
                ))
            })
            .catch(function (error) {
                alert('Something went wrong :(');
                console.log(error);
            });
    }

    const completeTask = (id) => {
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}/isCompleted`, undefined,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                }
            )
            .then(function (response) {
                setTasks(tasks => tasks.map(task =>
                    task.id === response.data[0].id ? response.data[0] : task
                ))
            })
            .catch(function (error) {
                alert('Something went wrong :(');
                console.log(error);
            });
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(function (response) {
                setTasks(response.data);
            })
            .catch(function (error) {
                alert('Something went wrong :(');
                console.log(error);
            });
    }, [])

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask, completeTask }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;