import React from 'react';
import { ConfigProvider, Checkbox, Form, Input, Segmented, InputNumber, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import MyTitle from './MyTitle';
import MyButton from './MyButton';

const schema = z.object({
    username: z
        .string()
        .trim()
        .min(1, { message: 'Required' })
        .regex(/^\S+$/, 'Spaces not allowed')
        .max(10, { message: 'Username should be less than 10 characters' }),
    email: z.string().trim().email('Please provide a valid email'),
    password: z
        .string()
        .trim()
        .min(1, { message: 'Required' })
        .min(8, { message: 'Password should contain at least 8 characters' })
        .regex(
            /(?=.*[0-9])(?=.*[!@#$%^&_\-*])(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z\d!@\-#$%^&_*]+$/,
            'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol (!@#$%^&_-*) and 1 number, spaces not allowed',
        ),
    age: z.number().min(10, 'You should be at least 10 years old'),
    gender: z.enum(['Female', 'Male']),
});

const RegistrationForm = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: { gender: 'Male' },
        resolver: zodResolver(schema),
    });

    const onFinish = (values) => {
        alert('Great!');
        console.log('Success:', values);
    };


    // TODO:
    // проверка совпадения паролей
    // сделать "живую" логику с запросом на бек и получением ответа
    // дальше перейти к login form
    // хранить в LocalStorage token

    // после создания обеих страниц сделать приватные и общедоступные роуты и навигацию по тексту под формами

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
                    labelCol={{ span: 6 }}
                    wrapperCol={{
                        span: 14,
                    }}>
                    <FormItem control={control} label="Username" name="username" required>
                        <Input placeholder="marry22" />
                    </FormItem>

                    <FormItem control={control} label="Email" name="email" required>
                        <Input placeholder="example@example.com" />
                    </FormItem>

                    <FormItem control={control} label="Password" name="password" required>
                        <Input.Password placeholder="Il0veR3d3v" />
                    </FormItem>

                    <FormItem
                        control={control}
                        label="Confirm Password"
                        name="confirmedPassword"
                        required>
                        <Input.Password placeholder="Il0veR3d3v" />
                    </FormItem>

                    <FormItem control={control} label="Gender" name="gender" required>
                        <Segmented
                            options={['Male', 'Female']}
                            onChange={(value) => {
                                console.log(value); // string
                            }}
                        />
                    </FormItem>

                    <FormItem control={control} label="Age" name="age" required>
                        <InputNumber
                            min={0}
                            max={100}
                            changeOnWheel
                            placeholder="27"
                            style={{
                                width: '100%',
                            }}
                        />
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
                            btnText={'Sign Up'}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 8,
                            offset: 8,
                        }}>
                        <Typography.Text strong className="formText" style={{ fontSize: '16px' }}>
                            Already have an account?{' '}
                        </Typography.Text>
                        <Typography.Link
                            style={{ fontSize: '16px', fontWeight: 600 }}
                            href="https://ant.design">
                            Log In!
                        </Typography.Link>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default RegistrationForm;
