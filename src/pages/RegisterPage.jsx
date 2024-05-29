import React from 'react';
import { Alert } from 'antd';

import MyTitle from '../components/custom/MyTitle';
import RegistrationForm from '../components/RegistrationForm.jsx';

const RegisterPage = () => {
    const [error, setError] = React.useState('');

    const handleErrorClose = () => setError('');

    return (
        <div className="registrationForm">
            <MyTitle title={'Register'} />

            <RegistrationForm error={error} setError={setError} />

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

export default RegisterPage;
