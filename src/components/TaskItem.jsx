import React, { useContext } from 'react';
import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

import TasksContext from '../contexts/TasksContext.js';

const TaskItem = ({ title, id, isCompleted, setEditId }) => {
    const { completeTask, deleteTask } = useContext(TasksContext);

    const handleEditTaskClick = (id) => {
        setEditId(id);
    };

    const handleDeleteTaskClick = (id) => {
        deleteTask(id);
    };

    return (
        <>
            <FontAwesomeIcon
                className="icon"
                icon={isCompleted ? faSquareCheck : faSquare}
                onClick={() => completeTask(id)}
            />

            <Typography.Text
                className="taskText"
                delete={isCompleted}
                onClick={() => completeTask(id)}>
                {title}
            </Typography.Text>

            <div className="configIcons">
                <FontAwesomeIcon
                    className="icon leftIcon"
                    icon={faPenToSquare}
                    onClick={() => handleEditTaskClick(id)}
                />
                <FontAwesomeIcon
                    className="icon"
                    icon={faTrash}
                    onClick={() => handleDeleteTaskClick(id)}
                />
            </div>
        </>
    );
};

export default TaskItem;
