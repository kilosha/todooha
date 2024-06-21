import React from 'react';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { useUpdateTaskMutation } from '../../services/todosServiceApi.js';

const EditTaskItem = ({ title, id, setEditId }) => {
    const [taskText, setTaskText] = React.useState(title);
    const [updateTaskTitle] = useUpdateTaskMutation();

    const updateTaskText = (e) => {
        setTaskText(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkAndUpdateTask();
        } else if (event.key === 'Escape') {
            setEditId('');
        }
    };

    const checkAndUpdateTask = () => {
        const formattedTaskText = taskText.trim();
        if (formattedTaskText) {
            updateTaskTitle({ id, newText: formattedTaskText });
            setEditId('');
        }
    };

    const handleCancelClick = () => {
        setEditId('');
    };

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
