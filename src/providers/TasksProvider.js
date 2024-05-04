import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TasksContext from '../contexts/TasksContext.js';
import { getTasks } from '../helpers/getTasks';

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = React.useState(() => getTasks());

    const addNewTask = (task) => {
        setTasks(tasks => [...tasks, { title: task, id: uuidv4(), isCompleted: false }]);
    }

    const deleteTask = (id) => {
        setTasks(tasks => tasks.filter(task => task.id !== id));
    }

    const updateTask = (id, newText) => {
        setTasks(tasks => tasks.map(task =>
            task.id === id ? { ...task, title: newText } : task
        ));
    }

    const completeTask = (id) => {
        setTasks(tasks => tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask, completeTask }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;