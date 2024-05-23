import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfigProvider, Form, Input, Typography, Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import MyTitle from './MyTitle';
import MyButton from './MyButton';

const schema = z.object({
    email: z.string().trim().email('Please provide a valid email'),
    password: z.string().trim().min(1, { message: 'Required' }),
});

const LoginForm = () => {
    const [requestSuccessfull, setRequestSuccessfull] = React.useState(false);
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

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values)
            .then(function (response) {
                setRequestSuccessfull(true);
                localStorage.setItem('token', response.data.token);
                navigate('/todooha/todos');
                //if remember true set to localStorage, else to sessionStorage
            })
            .catch(function (error) {
                alert('Something went wrong :(');
                //show if invalid values
                console.log(error);
            });
    };

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
                        Typography: {
                            linkDecoration: 'underline',
                        },
                    },
                }}>
                <Form
                    name="basic"
                    style={{
                        width: '100%',
                        paddingTop: '5px',
                    }}
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
                        style={{ paddingTop: '20px' }}
                        wrapperCol={{
                            span: 10,
                            offset: 7,
                        }}>
                        <MyButton
                            type="primary"
                            htmlType="submit"
                            btnText={'Sign In'}
                            style={{ width: '100%' }}
                            disabled={!isDirty || !isValid}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 8,
                            offset: 8,
                        }}>
                        <Typography.Text strong className="formText" style={{ fontSize: '16px' }}>
                            Don't have an account?{' '}
                        </Typography.Text>
                        <Link
                            to="/todooha/register"
                            component={Typography.Link}
                            style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                textDecoration: 'underline',
                            }}>
                            Sign Up!
                        </Link>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default LoginForm;
