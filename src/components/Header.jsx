import React from 'react';

import TaskInput from './TaskInput';
import MyTitle from './MyTitle';

const Header = () => {
    return (
        <>
            <MyTitle title={'Get things done!'} />
            <TaskInput />
        </>
    );
};

export default Header;
