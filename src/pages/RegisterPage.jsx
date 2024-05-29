import React from 'react';

import MyTitle from '../components/custom/MyTitle';
import RegistrationForm from '../components/RegistrationForm.jsx';

const RegisterPage = () => {
    return (
        <div className="registrationForm">
            <MyTitle title={'Register'} />
            <RegistrationForm />
        </div>
    );
};

export default RegisterPage;
