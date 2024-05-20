import React, { useContext } from 'react';
import { List, ConfigProvider, Empty } from 'antd';

import TaskItem from './TaskItem';
import EditTaskItem from './EditTaskItem';
import Header from './Header';

import TasksContext from '../contexts/TasksContext.js';

const TodoList = () => {
    const { tasks, isTasksLoading } = useContext(TasksContext);
    const [editId, setEditId] = React.useState('');

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
                loading={isTasksLoading}
                header={<Header />}
                bordered
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item key={task.id + task.isCompleted}>
                        {task.id !== editId ? (
                            <TaskItem {...task} setEditId={setEditId} />
                        ) : (
                            <EditTaskItem title={task.title} id={task.id} setEditId={setEditId} />
                        )}
                    </List.Item>
                )}
            />
        </ConfigProvider>
    );
};

export default TodoList;
