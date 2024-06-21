import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ConfigProvider, Empty, message, notification } from 'antd';

import TaskItem from './TaskItem.jsx';
import EditTaskItem from './EditTaskItem.jsx';
import Header from './Header.jsx';

import { loginLogger, resetStatus } from '../../redux/slices/responsesStateHandlerSlice.js';
import { useGetTodosQuery } from '../../services/todosServiceApi.js';

const TodoList = () => {
    const [editId, setEditId] = React.useState('');
    const { data: tasks } = useGetTodosQuery();
    const { errorMsg, successMsg, isLoading } = useSelector((state) => state.status);
    const dispatch = useDispatch();
    const [messageApi, messageHolder] = message.useMessage();
    const [notificationApi, notificationHolder] = notification.useNotification();

    useEffect(() => {
        if (errorMsg) {
            notificationApi.error({
                message: 'Something went wrong:(',
                description: errorMsg,
            });
            dispatch(resetStatus());
        } else if (successMsg) {
            messageApi.open({
                type: 'success',
                content: successMsg,
                duration: 2,
            });
            dispatch(resetStatus());
        }
    }, [messageApi, notificationApi, errorMsg, successMsg, dispatch]);

    useEffect(() => {
        dispatch(loginLogger());
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
                loading={isLoading}
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
