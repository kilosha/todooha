import * as z from 'zod';

const LoginSchema = z.object({
    email: z.string().trim().email('Please provide a valid email'),
    password: z.string().trim().min(1, { message: 'Required' }),
});

export default LoginSchema;