import * as z from 'zod';

const UserSchema = z.object({
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

export default UserSchema;