import React from 'react';

import MyTitle from '../components/custom/MyTitle';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
    return (
        <div className="registrationForm">
            <MyTitle title={'Log in'} />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
