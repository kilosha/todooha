import React, { useContext } from 'react';
import { List, ConfigProvider, Empty } from 'antd';

import TaskItem from './components/TaskItem';
import EditTaskItem from './components/EditTaskItem';
import Header from './components/Header';

import TasksContext from './contexts/TasksContext.js';

import './App.css';

function App() {
    const { tasks } = useContext(TasksContext);
    const [editId, setEditId] = React.useState('');

    return (
        <div className="App">
            <ConfigProvider renderEmpty={() => <Empty description={<p className="emptyListText">Set a new challenge using the input above!</p>} />}>
                <List
                    className='tasksList'
                    header={<Header />}
                    bordered
                    dataSource={tasks}
                    renderItem={(task) => (
                        <List.Item key={task.id + task.isCompleted}>
                            {task.id !== editId ?
                                <TaskItem title={task.title} id={task.id} setEditId={setEditId} isCompleted={task.isCompleted} />
                                : <EditTaskItem title={task.title} id={task.id} setEditId={setEditId} />}
                        </List.Item>
                    )}
                />
            </ConfigProvider>
        </div>
    );
}

export default App;
