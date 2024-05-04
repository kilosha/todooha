import React from 'react';
import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({
    title,
    handleEditTaskClick,
    handleDeleteTaskClick,
    id,
    isCompleted,
    completeTask,
}) => {
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
