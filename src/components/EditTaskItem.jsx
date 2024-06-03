import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { updateTask } from '../redux/actions/taskActions.js';
import { setEditId, setTaskText } from '../redux/actions/editModeActions.js';

const EditTaskItem = ({ title, id }) => {
    const taskText = useSelector((state) => state.editTask.taskText);
    const dispatch = useDispatch();

    const updateTaskText = (e) => {
        dispatch(setTaskText(e.target.value));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkAndUpdateTask();
        } else if (event.key === 'Escape') {
            dispatch(setEditId(''));
        }
    };

    const checkAndUpdateTask = () => {
        const formattedTaskText = taskText.trim();
        if (formattedTaskText) {
            dispatch(updateTask(id, formattedTaskText));
            dispatch(setEditId(''));
        }
    };

    const handleCancelClick = () => {
        dispatch(setEditId(''));
    };

    useEffect(() => {
        dispatch(setTaskText(title));
    }, [dispatch, title]);

    return (
        <>
            <Input
                value={taskText}
                onChange={(e) => updateTaskText(e)}
                onKeyDown={handleKeyDown}
                autoFocus={true}
                className="editTaskInput"
            />

            <div className="configIcons">
                <FontAwesomeIcon
                    icon={faFileCircleCheck}
                    className="icon leftIcon"
                    beat
                    onClick={checkAndUpdateTask}
                />
                <FontAwesomeIcon
                    icon={faFileCircleXmark}
                    className="icon"
                    onClick={handleCancelClick}
                />
            </div>
        </>
    );
};

export default EditTaskItem;
