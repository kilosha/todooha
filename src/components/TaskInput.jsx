import React from 'react';
import { Button, Input, Space } from 'antd';

const TaskInput = ({ addNewTask }) => {
    const [task, setTask] = React.useState('');

    // alert('rerender');
    const setNewTask = (e) => {
        setTask(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (task.trim()) {
                addNewTask(task.trim());
                setTask('');
            }
        }
    };

    const addTask = () => {
        if (task.trim()) {
            addNewTask(task.trim());
            setTask('');
        }
    };

    return (
        <div>
            <Space.Compact
                style={{
                    width: '100%',
                }}>
                <Input
                    value={task}
                    onChange={(e) => setNewTask(e)}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you need to do?"
                />
                <Button type="primary" onClick={addTask} disabled={!task.trim()}>
                    Add Task
                </Button>
            </Space.Compact>
        </div>
    );
};

export default TaskInput;
