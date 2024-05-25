import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfigProvider, Form, Input, Segmented, InputNumber, Typography, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import API from '../apis/user.js';
import handleError from '../helpers/handleError.js';
import MyTitle from './custom/MyTitle';
import MyButton from './custom/MyButton';

const schema = z.object({
    username: z
        .string()
        .trim()
        .min(1, { message: 'Required' })
        .regex(/^\S+$/, 'Spaces not allowed')
        .max(15, { message: 'Username should be less than 15 characters' }),
    email: z.string().trim().email('Please provide a valid email'),
    password: z
        .string()
        .min(1, { message: 'Required' })
        .min(8, { message: 'Password should contain at least 8 characters' })
        .regex(
            /(?=.*[0-9])(?=.*[!@#$%^&_\-*])(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z\d!@\-#$%^&_*]+$/,
            'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol (!@#$%^&_-*) and 1 number, spaces not allowed',
        ),
    age: z
        .number({ invalid_type_error: 'Required number' })
        .min(10, 'You should be at least 10 years old')
        .max(100, 'Values greater than 100 are not allowed'),
    gender: z.enum(['female', 'male']),
    confirmedPassword: z.string(),
});

const RegistrationForm = () => {
    const [requestSuccessfull, setRequestSuccessfull] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: { gender: 'male' },
        resolver: zodResolver(schema),
    });

    const onFinish = (values) => {
        const { confirmedPassword, ...newUser } = values;
        error && setError('');
        setIsLoading(true);
        console.log(newUser);

        API.post('/users/register', newUser)
            .then((response) => {
                setRequestSuccessfull(true);
            })
            .catch((error) => {
                handleError(error, setError);
            })
            .finally(() => setIsLoading(false));
    };

    const handleErrorClose = () => setError('');

    React.useEffect(() => {
        if (requestSuccessfull) {
            alert('User registered successfully');
            reset({ gender: 'male' });
            setRequestSuccessfull(false);
            navigate('/login');
        }
    }, [requestSuccessfull, reset, navigate]);

    return (
        <div className="registrationForm">
            <MyTitle title={'Register'} />

            <ConfigProvider
                theme={{
                    components: {
                        Form: {
                            labelColor: '#fff',
                        },
                        Checkbox: {
                            colorText: '#fff',
                            colorPrimary: 'rgba(87, 33, 189, 1)',
                            colorPrimaryBorder: 'rgba(87, 33, 189, 1)',
                            colorPrimaryHover: '#742ef7',
                        },
                        Segmented: {
                            itemSelectedBg: '#7534ee',
                            itemSelectedColor: '#fff',
                        },
                    },
                }}>
                <Form
                    name="basic"
                    className="form"
                    onFinish={handleSubmit(onFinish)}
                    autoComplete="off"
                    labelCol={{ span: 7 }}
                    wrapperCol={{
                        span: 14,
                    }}
                    colon={false}>
                    <FormItem
                        control={control}
                        label="Username"
                        name="username"
                        required
                        rules={[
                            () => ({
                                validator(_, value) {
                                    const re = /^\S*$/;
                                    if (value === '' || re.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Whitespaces are not allowed'));
                                },
                            }),
                        ]}>
                        <Input placeholder="marry22" />
                    </FormItem>

                    <FormItem
                        control={control}
                        label="Email"
                        name="email"
                        required
                        rules={[
                            () => ({
                                validator(_, value) {
                                    const re = /^\S*$/;
                                    if (value === '' || re.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Whitespaces are not allowed'));
                                },
                            }),
                        ]}>
                        <Input placeholder="example@example.com" />
                    </FormItem>

                    <FormItem
                        hasFeedback
                        control={control}
                        label="Password"
                        name="password"
                        required>
                        <Input.Password placeholder="Il0veR3d3v" />
                    </FormItem>

                    <FormItem
                        hasFeedback
                        control={control}
                        label="Confirm Password"
                        name="confirmedPassword"
                        required
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                warningOnly: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered do not match!',
                                        ),
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password placeholder="Il0veR3d3v" />
                    </FormItem>

                    <FormItem control={control} label="Gender" name="gender" required>
                        <Segmented
                            options={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                            ]}
                        />
                    </FormItem>

                    <FormItem control={control} label="Age" name="age" required>
                        <InputNumber changeOnWheel placeholder="27" className="formNumberInput" />
                    </FormItem>

                    <Form.Item
                        className="btnFormItem"
                        wrapperCol={{
                            span: 10,
                            offset: 7,
                        }}>
                        <MyButton
                            loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            btnText={'Sign Up'}
                            className="formBtn"
                            disabled={!isDirty || !isValid}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 8,
                            offset: 8,
                        }}>
                        <Typography.Text strong className="formText">
                            Already have an account?{' '}
                        </Typography.Text>
                        <Link to="/login" component={Typography.Link} className="signLink">
                            Log In!
                        </Link>
                    </Form.Item>
                </Form>
            </ConfigProvider>

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

export default RegistrationForm;
