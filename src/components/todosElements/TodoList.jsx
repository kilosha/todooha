import React, { useContext } from 'react';
import { List, ConfigProvider, Empty, Alert, message } from 'antd';

import TaskItem from './TaskItem.jsx';
import EditTaskItem from './EditTaskItem.jsx';
import Header from './Header.jsx';

import TasksContext from '../../contexts/TasksContext.js';

const TodoList = () => {
    const { tasks, isTasksLoading, error, setError, contextHolder } = useContext(TasksContext);
    const [editId, setEditId] = React.useState('');

    const handleErrorClose = () => setError('');

    return (
        <ConfigProvider
            renderEmpty={() => (
                <Empty
                    description={
                        <p className="emptyListText">Set a new challenge using the input above!</p>
                    }
                />
            )}
            theme={{
                components: {
                    Pagination: {
                        itemActiveBg: '#7534ee',
                        colorPrimary: '#eeeeee',
                        colorPrimaryBorder: 'rgba(87, 33, 189, 1)',
                        colorPrimaryHover: 'rgba(87, 33, 189, 1)',
                        colorText: 'white',
                        colorTextDisabled: 'rgba(221, 221, 221, 0.25)',
                    },
                },
            }}>
            {contextHolder}
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
                pagination={{
                    pageSize: 3,
                    align: 'center',
                    hideOnSinglePage: true,
                }}
                footer={
                    error && (
                        <Alert
                            message="Something went wrong:("
                            description={error}
                            type="error"
                            closable
                            onClose={handleErrorClose}
                        />
                    )
                }
            />
        </ConfigProvider>
    );
};

export default TodoList;
