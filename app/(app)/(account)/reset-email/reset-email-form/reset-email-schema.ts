import z from 'zod';

export const resetEmailSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

export type ResetEmailValues = z.infer<typeof resetEmailSchema>;
