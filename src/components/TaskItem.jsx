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
            {isCompleted ? (
                <FontAwesomeIcon icon={faSquareCheck} onClick={() => completeTask(id)} />
            ) : (
                <FontAwesomeIcon icon={faSquare} onClick={() => completeTask(id)} />
            )}

            <Typography.Text
                style={{ color: 'white', cursor: 'pointer' }}
                delete={isCompleted}
                onClick={() => completeTask(id)}>
                {title}
            </Typography.Text>
            <div style={{ display: 'flex' }}>
                <FontAwesomeIcon
                    style={{ marginRight: '6px', cursor: 'pointer' }}
                    icon={faPenToSquare}
                    onClick={() => handleEditTaskClick(id)}
                />
                <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    icon={faTrash}
                    onClick={() => handleDeleteTaskClick(id)}
                />
            </div>
        </>
    );
};

export default TaskItem;
