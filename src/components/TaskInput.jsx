import React, { useContext } from 'react';
import { Input, Space } from 'antd';

import TasksContext from '../contexts/TasksContext.js';
import MyButton from './MyButton.jsx';

const TaskInput = () => {
    const [task, setTask] = React.useState('');
    const { addNewTask } = useContext(TasksContext);

    const setNewTask = (e) => {
        setTask(e.target.value);
    };

    const checkAndAddTask = () => {
        const formattedTask = task.trim();
        if (formattedTask) {
            addNewTask(formattedTask);
            setTask('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkAndAddTask();
        }
    };

    return (
        <div>
            <Space.Compact className="fullWidth">
                <Input
                    value={task}
                    onChange={(e) => setNewTask(e)}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you need to do?"
                />
                <MyButton handleBtnClick={checkAndAddTask} disabled={!task.trim()} />
            </Space.Compact>
        </div>
    );
};

export default TaskInput;
