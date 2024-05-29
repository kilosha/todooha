import React from 'react';

import MyTitle from '../components/custom/MyTitle';
import LoginForm from '../components/LoginForm.jsx';
import StyledForm from '../components/StyledForm.jsx';

const LoginPage = () => {
    return (
        <div className="registrationForm">
            <MyTitle title={'Log in'} />
            <StyledForm><LoginForm /></StyledForm>
        </div>
    );
};

export default LoginPage;
