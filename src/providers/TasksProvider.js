import React, { useEffect } from 'react';
import { message, notification } from 'antd';

import API from '../apis/todos.js';
import getErrorMessage from '../helpers/getErrorMessage.js';
import TasksContext from '../contexts/TasksContext.js';

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState([]);
    const [isTasksLoading, setIsTasksLoading] = React.useState(false);
    const [messageApi, messageHolder] = message.useMessage();
    const [notificationApi, notificationHolder] = notification.useNotification();

    const addNewTask = async task => {
        setIsTasksLoading(true);

        try {
            const response = await API.post('/todos', { title: task });
            setTasks(tasks => [response.data, ...tasks]);
            messageApi.open({
                type: 'success',
                content: 'Task was added successfully',
                duration: 2
            });
        } catch (error) {
            notificationApi.error({
                message: 'Something went wrong:(',
                description: getErrorMessage(error),
            });
        } finally {
            setIsTasksLoading(false);
        }
    }

    const deleteTask = async id => {
        setIsTasksLoading(true);

        try {
            const response = await API.delete(`/todos/${id}`);
            setTasks(tasks => tasks.filter(task => task.id !== response.data.id));
            messageApi.open({
                type: 'success',
                content: 'Task was deleted successfully',
                duration: 2
            });
        } catch (error) {
            notificationApi.error({
                message: 'Something went wrong:(',
                description: getErrorMessage(error),
            });
        } finally {
            setIsTasksLoading(false);
        }
    }

    const updateTask = async (id, newText) => {
        setIsTasksLoading(true);

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
            notificationApi.error({
                message: 'Something went wrong:(',
                description: getErrorMessage(error),
            });
        } finally {
            setIsTasksLoading(false);
        }
    }

    const completeTask = async id => {
        setIsTasksLoading(true);

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
            notificationApi.error({
                message: 'Something went wrong:(',
                description: getErrorMessage(error),
            });
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
                notificationApi.error({
                    message: 'Something went wrong:(',
                    description: getErrorMessage(error),
                });
            } finally {
                setIsTasksLoading(false);
            }
        }

        getTasks();

    }, [notificationApi]);

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask, completeTask, isTasksLoading, messageHolder, notificationHolder }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;