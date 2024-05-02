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
        if (event.key === 'Enter') {
            if (taskText.trim()) {
                updateTask(id, taskText.trim());
            }
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
                style={{ width: '85%' }}
                value={taskText}
                onChange={(e) => updateTaskText(e)}
                onKeyDown={handleKeyDown}
                autoFocus={true}></Input>
            <div style={{ display: 'flex' }}>
                <FontAwesomeIcon
                    icon={faFileCircleCheck}
                    style={{ marginRight: '6px', cursor: 'pointer' }}
                    beat
                    onClick={handleSaveClick}
                />
                <FontAwesomeIcon
                    icon={faFileCircleXmark}
                    style={{ cursor: 'pointer' }}
                    onClick={handleCancelClick}
                />
            </div>
        </>
    );
};

export default EditTaskItem;
