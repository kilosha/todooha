import React, { useEffect } from 'react';
import { message } from 'antd';

import API from '../apis/todos.js';
import handleError from '../helpers/handleError.js';
import TasksContext from '../contexts/TasksContext.js';

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);
    const [isTasksLoading, setIsTasksLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const addNewTask = task => {
        setIsTasksLoading(true);
        error && setError('');

        API
            .post('/todos',
                { title: task }
            )
            .then((response) => {
                setTasks(tasks => [response.data, ...tasks]);
                messageApi.open({
                    type: 'success',
                    content: 'Task was added successfully',
                    duration: 2
                });
            })
            .catch((error) => {
                handleError(error, setError);
            }).finally(() => setIsTasksLoading(false));
    }

    const deleteTask = id => {
        setIsTasksLoading(true);
        error && setError('');

        API
            .delete(`/todos/${id}`)
            .then((response) => {
                setTasks(tasks => tasks.filter(task => task.id !== response.data.id));
                messageApi.open({
                    type: 'success',
                    content: 'Task was deleted successfully',
                    duration: 2
                });
            })
            .catch((error) => {
                handleError(error, setError);
            }).finally(() => setIsTasksLoading(false));
    }

    const updateTask = (id, newText) => {
        setIsTasksLoading(true);
        error && setError('');

        API
            .patch(`/todos/${id}`, { title: newText })
            .then((response) => {
                setTasks(tasks => tasks.map(task =>
                    task.id === response.data.id ? response.data : task
                ))
                messageApi.open({
                    type: 'success',
                    content: 'Task was updated successfully',
                    duration: 2
                });
            })
            .catch((error) => {
                handleError(error, setError);
            }).finally(() => setIsTasksLoading(false));
    }

    const completeTask = id => {
        setIsTasksLoading(true);
        error && setError('');

        API
            .patch(`/todos/${id}/isCompleted`)
            .then((response) => {
                setTasks(tasks => tasks.map(task =>
                    task.id === response.data[0].id ? response.data[0] : task
                ))
                messageApi.open({
                    type: 'success',
                    content: 'Task was updated successfully', 
                    duration: 2
                });
            })
            .catch((error) => {
                handleError(error, setError);
            }).finally(() => setIsTasksLoading(false));
    }

    useEffect(() => {
        setIsTasksLoading(true);

        API
            .get('/todos')
            .then((response) => {
                const sortedTasks = response.data.sort((a, b) => b.id - a.id);
                setTasks(sortedTasks);
            })
            .catch((error) => {
                handleError(error, setError);
            }).finally(() => setIsTasksLoading(false));
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask, completeTask, isTasksLoading, error, setError, contextHolder }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;