import React from 'react';

import TodoList from './components/TodoList';
import withLogger from './components/withLogger';

import './App.css';


function App() {
    const LoggedTodoList = withLogger(TodoList);

    return (
        <div className="App">
            <LoggedTodoList />
        </div>
    );
}

export default App;
