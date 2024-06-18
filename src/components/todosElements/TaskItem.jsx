import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

import { fetchCompleteTask, fetchDeleteTasks } from '../../redux/reducer/todosReducer.js';

const TaskItem = ({ title, id, isCompleted, setEditId }) => {
    const dispatch = useDispatch();

    const handleEditTaskClick = (id) => {
        setEditId(id);
    };

    const handleDeleteTaskClick = (id) => {
        dispatch(fetchDeleteTasks(id));
    };

    return (
        <>
            <FontAwesomeIcon
                className="icon"
                icon={isCompleted ? faSquareCheck : faSquare}
                onClick={() => dispatch(fetchCompleteTask(id))}
            />

            <Typography.Text
                className="taskText"
                delete={isCompleted}
                onClick={() => dispatch(fetchCompleteTask(id))}>
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
