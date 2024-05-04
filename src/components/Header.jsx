import React from 'react';
import TaskInput from './TaskInput';

const Header = ({ addNewTask }) => {
    return (
        <>
            <h2 className="headerTitle" >
                Get things done!
            </h2>
            <TaskInput addNewTask={addNewTask} />
        </>
    );
};

export default Header;
