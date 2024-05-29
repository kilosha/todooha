import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfigProvider, Form, Input, Typography, Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';

import API from '../apis/user.js';
import handleError from '../helpers/handleError.js';
import MyButton from './custom/MyButton';
import LoginSchema from '../helpers/LoginSchema.js';

const LoginForm = ({ error, setError }) => {
    const [requestSuccessfull, setRequestSuccessfull] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: { isDirty, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
        defaultValues: { remember: false },
    });

    const onFinish = async (values) => {
        console.log(values);
        error && setError('');
        setIsLoading(true);

        try {
            const response = await API.post('/auth/login', values);
            setRequestSuccessfull(true);

            if (getValues('remember')) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }

            navigate('/');
        } catch (error) {
            handleError(error, setError);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (requestSuccessfull) {
            alert('User logged in successfully');
            reset();
            setRequestSuccessfull(false);
        }
    }, [requestSuccessfull, reset]);

    return (
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

                <FormItem
                    control={control}
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        span: 14,
                        offset: 7,
                    }}>
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
                    <Link to="/register" component={Typography.Link} className="signLink">
                        Sign Up!
                    </Link>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
};

export default LoginForm;
