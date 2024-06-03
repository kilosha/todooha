import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

import { deleteTask, completeTask } from '../redux/actions/taskActions.js';
import { setEditId } from '../redux/actions/editModeActions.js';

const TaskItem = ({ title, id, isCompleted }) => {
    const dispatch = useDispatch();

    const handleEditTaskClick = (id) => {
        dispatch(setEditId(id));
    };

    const handleDeleteTaskClick = (id) => {
        dispatch(deleteTask(id));
    };

    return (
        <>
            <FontAwesomeIcon
                className="icon"
                icon={isCompleted ? faSquareCheck : faSquare}
                onClick={() => dispatch(completeTask(id))}
            />

            <Typography.Text
                className="taskText"
                delete={isCompleted}
                onClick={() => dispatch(completeTask(id))}>
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
