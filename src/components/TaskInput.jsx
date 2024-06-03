import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Input, Space } from 'antd';

import MyButton from './MyButton.jsx';
import { addTitle } from '../redux/actions/addInputActions.js';
import { addNewTask } from '../redux/actions/taskActions.js';

const TaskInput = () => {
    const { title } = useSelector((state) => state.addInput);
    const dispatch = useDispatch();

    const setNewTask = (e) => {
        dispatch(addTitle(e.target.value));
    };

    const checkAndAddTask = () => {
        const formattedTask = title.trim();
        if (formattedTask) {
            const task = { title: formattedTask, id: uuidv4(), isCompleted: false };
            dispatch(addNewTask(task));
            dispatch(addTitle(''));
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
                    value={title}
                    onChange={(e) => setNewTask(e)}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you need to do?"
                />
                <MyButton handleBtnClick={checkAndAddTask} disabled={!title.trim()} />
            </Space.Compact>
        </div>
    );
};

export default TaskInput;
