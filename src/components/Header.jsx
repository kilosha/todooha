import React from 'react';

import TaskInput from './TaskInput';

const Header = () => {
    return (
        <>
            <h2 className="headerTitle">Get things done!</h2>
            <TaskInput />
        </>
    );
};

export default Header;
