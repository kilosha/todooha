import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ConfigProvider,
    Form,
    Input,
    Segmented,
    InputNumber,
    Typography,
    notification,
    Grid,
} from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';

import API from '../apis/user.js';
import getErrorMessage from '../helpers/getErrorMessage.js';
import MyButton from './custom/MyButton';
import UserSchema from '../helpers/UserSchema.js';

const RegistrationForm = () => {
    const [requestSuccessfull, setRequestSuccessfull] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [notificationApi, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const breakpoints = Grid.useBreakpoint();

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: { gender: 'male' },
        resolver: zodResolver(UserSchema),
    });

    const onFinish = async (values) => {
        const { confirmedPassword, ...newUser } = values;
        setIsLoading(true);
        console.log(newUser);

        try {
            await API.post('/users/register', newUser);
            setRequestSuccessfull(true);
        } catch (error) {
            notificationApi.error({
                message: 'Something went wrong:(',
                description: getErrorMessage(error),
            });
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (requestSuccessfull) {
            alert('User registered successfully');
            reset({ gender: 'male' });
            setRequestSuccessfull(false);
            navigate('/login');
        }
    }, [requestSuccessfull, reset, navigate]);

    return (
        <>
            {contextHolder}
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

                <FormItem hasFeedback control={control} label="Password" name="password" required>
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
                                    new Error('The new password that you entered do not match!'),
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
                        span: breakpoints.xxl ? 8 : 10,
                        offset: breakpoints.xxl ? 8 : 7,
                    }}>
                    <Typography.Text strong className="formText">
                        Already have an account?{' '}
                    </Typography.Text>
                    <Link to="/login" component={Typography.Link} className="signLink">
                        Log In!
                    </Link>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegistrationForm;
