import React from 'react';
import { Alert } from 'antd';

import MyTitle from '../components/custom/MyTitle';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
    const [error, setError] = React.useState('');

    const handleErrorClose = () => setError('');

    return (
        <div className="registrationForm">
            <MyTitle title={'Log in'} />

            <LoginForm error={error} setError={setError} />

            {error && (
                <Alert
                    message="Something went wrong:("
                    description={error}
                    type="error"
                    closable
                    onClose={handleErrorClose}
                />
            )}
        </div>
    );
};

export default LoginPage;
