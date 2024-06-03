import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, ConfigProvider, Empty } from 'antd';

import TaskItem from './TaskItem';
import EditTaskItem from './EditTaskItem';
import Header from './Header';

const TodoList = () => {
    const { tasks } = useSelector((state) => state.list);
    const editId = useSelector((state) => state.editTask.editId);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <ConfigProvider
            renderEmpty={() => (
                <Empty
                    description={
                        <p className="emptyListText">Set a new challenge using the input above!</p>
                    }
                />
            )}>
            <List
                className="tasksList"
                header={<Header />}
                bordered
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item key={task.id + task.isCompleted}>
                        {task.id !== editId ? (
                            <TaskItem {...task} />
                        ) : (
                            <EditTaskItem title={task.title} id={task.id} />
                        )}
                    </List.Item>
                )}
            />
        </ConfigProvider>
    );
};

export default TodoList;
