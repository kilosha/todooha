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

    const addNewTask = async task => {
        setIsTasksLoading(true);
        error && setError('');

        try {
            const response = await API.post('/todos', { title: task });
            setTasks(tasks => [response.data, ...tasks]);
            messageApi.open({
                type: 'success',
                content: 'Task was added successfully',
                duration: 2
            });
        } catch (error) {
            handleError(error, setError);
        } finally {
            setIsTasksLoading(false);
        }
    }

    const deleteTask = async id => {
        setIsTasksLoading(true);
        error && setError('');

        try {
            const response = await API.delete(`/todos/${id}`);
            setTasks(tasks => tasks.filter(task => task.id !== response.data.id));
            messageApi.open({
                type: 'success',
                content: 'Task was deleted successfully',
                duration: 2
            });
        } catch (error) {
            handleError(error, setError);
        } finally {
            setIsTasksLoading(false);
        }
    }

    const updateTask = async (id, newText) => {
        setIsTasksLoading(true);
        error && setError('');

        try {
            const response = await API.patch(`/todos/${id}`, { title: newText });
            setTasks(tasks => tasks.map(task =>
                task.id === response.data.id ? response.data : task
            ))
            messageApi.open({
                type: 'success',
                content: 'Task was updated successfully',
                duration: 2
            });
        } catch (error) {
            handleError(error, setError);
        } finally {
            setIsTasksLoading(false);
        }
    }

    const completeTask = async id => {
        setIsTasksLoading(true);
        error && setError('');

        try {
            const response = await API.patch(`/todos/${id}/isCompleted`);
            setTasks(tasks => tasks.map(task =>
                task.id === response.data[0].id ? response.data[0] : task
            ))
            messageApi.open({
                type: 'success',
                content: 'Task was updated successfully',
                duration: 2
            });
        } catch (error) {
            handleError(error, setError);
        } finally {
            setIsTasksLoading(false);
        }
    }

    useEffect(() => {
        setIsTasksLoading(true);

        const getTasks = async () => {
            try {
                const response = await API.get('/todos');
                const sortedTasks = response.data.sort((a, b) => b.id - a.id);
                setTasks(sortedTasks);
            } catch (error) {
                handleError(error, setError);
            } finally {
                setIsTasksLoading(false);
            }
        }

        getTasks();

    }, []);

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask, completeTask, isTasksLoading, error, setError, contextHolder }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;