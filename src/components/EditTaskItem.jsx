import React from 'react';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';

const EditTaskItem = ({ title, id, updateTask, setEditId }) => {
    const [taskText, setTaskText] = React.useState(title);

    const updateTaskText = (e) => {
        setTaskText(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && taskText.trim()) {
            updateTask(id, taskText.trim());
        } else if (event.key === 'Escape') {
            setEditId('');
        }
    };

    const handleSaveClick = () => {
        if (taskText.trim()) {
            updateTask(id, taskText.trim());
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
                    onClick={handleSaveClick}
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
