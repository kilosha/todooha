import React from 'react';

import MyTitle from '../components/custom/MyTitle';
import RegistrationForm from '../components/RegistrationForm.jsx';
import StyledForm from '../components/StyledForm.jsx';

const RegisterPage = () => {
    return (
        <div className="registrationForm">
            <MyTitle title={'Register'} />
            <StyledForm>
                <RegistrationForm />
            </StyledForm>
        </div>
    );
};

export default RegisterPage;
