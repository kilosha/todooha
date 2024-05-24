import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfigProvider, Form, Input, Typography, Checkbox, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import MyTitle from './custom/MyTitle';
import MyButton from './custom/MyButton';

const schema = z.object({
    email: z.string().trim().email('Please provide a valid email'),
    password: z.string().trim().min(1, { message: 'Required' }),
});

const LoginForm = () => {
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
        resolver: zodResolver(schema),
    });

    const onFinish = (values) => {
        console.log(values);
        error && setError('');
        setIsLoading(true);

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values)
            .then(function (response) {
                setRequestSuccessfull(true);
                localStorage.setItem('token', response.data.token);
                navigate('/todooha');
                //if remember true set to localStorage, else to sessionStorage
            })
            .catch(function (error) {
                const errMessage =
                    error?.response?.data?.message ||
                    'Unexpected error occured. Please, try again later';
                console.log(error);
                setError(errMessage);
            })
            .finally(() => setIsLoading(false));
    };

    const handleErrorClose = () => setError('');

    React.useEffect(() => {
        if (requestSuccessfull) {
            alert('User logged in successfully');
            reset();
            setRequestSuccessfull(false);
        }
    }, [requestSuccessfull, reset]);

    return (
        <div className="registrationForm">
            <MyTitle title={'Log in'} />

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
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit(onFinish)}
                    autoComplete="off"
                    labelCol={{ span: 7 }}
                    wrapperCol={{
                        span: 14,
                    }}
                    colon={false}>
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
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                        ]}>
                        <Input.Password placeholder="Il0veR3d3v" />
                    </FormItem>

                    <FormItem control={control} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
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
                            btnText={'Sign In'}
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
                            Don't have an account?{' '}
                        </Typography.Text>
                        <Link
                            to="/todooha/register"
                            component={Typography.Link}
                            className="signLink">
                            Sign Up!
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

export default LoginForm;
