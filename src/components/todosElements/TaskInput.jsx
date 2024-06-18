import React from 'react';
import { useDispatch } from 'react-redux';
import { Input, Space } from 'antd';

import MyButton from '../custom/MyButton.jsx';
import { fetchPostTask } from '../../redux/reducer/todosReducer.js';

const TaskInput = () => {
    const [task, setTask] = React.useState('');
    const dispatch = useDispatch();

    const setNewTask = (e) => {
        setTask(e.target.value);
    };

    const checkAndAddTask = () => {
        const formattedTask = task.trim();
        if (formattedTask) {
            dispatch(fetchPostTask(formattedTask));
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
                <MyButton
                    handleBtnClick={checkAndAddTask}
                    disabled={!task.trim()}
                    btnText={'Add Task'}
                />
            </Space.Compact>
        </div>
    );
};

export default TaskInput;
