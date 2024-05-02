import React from 'react';
import { List } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import TaskItem from './components/TaskItem';
import EditTaskItem from './components/EditTaskItem';
import Header from './components/Header';

import './App.css';

function App() {
    const [data, setData] = React.useState([
        { title: "Купить гвозди 🔨", id: "ea6abbd7-eb68-4ee0-b352-23721c84c1f2", isCompleted: true },
        { title: "Сделать домашку по React", id: "0b480ff3-64bd-42d3-9318-f728cc1d62dd", isCompleted: true },
        { title: "Защитить чек-лист", id: " bae6bb59-5c22-42f5-8f4c-1fc8d9877a5d", isCompleted: false },
        { title: "Переехать в США", id: "e7f723f0-867c-4184-bdbf-7774faea5ec5", isCompleted: false }
    ]);

    const [editId, setEditId] = React.useState('');

    const addNewTask = (task) => {
        setData(tasks => [...tasks, { title: task, id: uuidv4() }]);
    }

    const handleEditTaskClick = (id) => {
        setEditId(id);
    }

    const handleDeleteTaskClick = (id) => {
        setData(data => data.filter(task => task.id !== id));
    }

    const updateTask = (id, newText) => {
        setData(data => data.map(task =>
            task.id === id ? { ...task, title: newText } : task
        ));
        setEditId('');
    }

    const completeTask = (id) => {
        setData(data => data.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    }

    return (
        <div className="App">
            <List
                style={{
                    width: '420px',
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(255, 255, 255, .2)',
                    backdropFilter: 'blur(20px)', // Не работает на сафари(
                    boxShadow: '0 0 10px rgba(125, 9, 174, 0.612)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '3px 4px'
                }}
                header={<Header addNewTask={addNewTask} />}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }} key={item.id + item.isCompleted}>
                        {item.id !== editId ?
                            <TaskItem title={item.title} id={item.id} handleEditTaskClick={handleEditTaskClick} handleDeleteTaskClick={handleDeleteTaskClick} isCompleted={item.isCompleted} completeTask={completeTask} />
                            : <EditTaskItem title={item.title} id={item.id} updateTask={updateTask} setEditId={setEditId} />}
                    </List.Item>
                )}
            />

        </div>
    );
}

export default App;
