import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ConfigProvider, Empty, message, notification } from 'antd';

import TaskItem from './TaskItem.jsx';
import EditTaskItem from './EditTaskItem.jsx';
import Header from './Header.jsx';

import { fetchGetTasks, resetStatus } from '../../redux/slices/todosSlice.js';
import getSuccessMessage from '../../helpers/getSuccessMessage.js';

const TodoList = () => {
    const [editId, setEditId] = React.useState('');
    const { tasks, status, errorMsg } = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const [messageApi, messageHolder] = message.useMessage();
    const [notificationApi, notificationHolder] = notification.useNotification();

    useEffect(() => {
        if (status === 'failed') {
            notificationApi.error({
                message: 'Something went wrong:(',
                description: errorMsg,
            });
        } else if (status && status !== 'loading') {
            messageApi.open({
                type: 'success',
                content: getSuccessMessage(status),
                duration: 2,
            });
        }
    }, [status, errorMsg, messageApi, notificationApi]);

    useEffect(() => {
        return () => {
            dispatch(resetStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGetTasks());
    }, [dispatch]);

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
            {messageHolder}
            {notificationHolder}
            <List
                className="tasksList"
                loading={status === 'loading'}
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
            />
        </ConfigProvider>
    );
};

export default TodoList;
