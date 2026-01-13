'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signInSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .min(1, 'Email is required.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInValues) {
    await new Promise(resolve => setTimeout(resolve, 800));

    alert(JSON.stringify(values, undefined, 2));
  }

  const inputBase =
    'h-12 w-full rounded-md border-2 px-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300';
  const inputOk = 'border-black';
  const inputError = 'border-red-600 focus:border-red-600 focus:ring-red-200';

  return (
    <form
      className="mt-6 flex flex-col sm:mt-10"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Email */}
      <label className="text-sm font-bold" htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        className={`${inputBase} ${errors.email ? inputError : inputOk} mt-2.5`}
        aria-invalid={errors.email ? 'true' : 'false'}
        aria-describedby={errors.email ? 'email-error' : undefined}
        {...register('email')}
      />
      <p id="email-error" className="mt-2 text-sm text-red-600">
        {errors.email?.message ?? ''}
      </p>

      {/* Password */}
      <label className="mt-2 text-sm font-bold" htmlFor="password">
        Password
      </label>

      <div className="relative mt-2.5">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          autoComplete="current-password"
          className={`${inputBase} ${errors.password ? inputError : inputOk} pr-10`}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
        />

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => setShowPassword(v => !v)}
          className="absolute inset-y-0 right-3 flex items-center text-neutral-700 hover:cursor-pointer hover:text-neutral-800 disabled:opacity-50"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <p id="password-error" className="mt-2 text-sm text-red-600">
        {errors.password?.message ?? ''}
      </p>

      {/* Forgot password */}
      <Link
        href="/forgot-password"
        className="mt-1.5 text-sm font-medium text-neutral-800 underline hover:text-neutral-900"
      >
        Forgot password?
      </Link>

      {/* Submit */}
      <button
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 font-semibold text-black hover:cursor-pointer hover:bg-amber-500 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        <span>{isSubmitting ? 'Signing in…' : 'Sign In'}</span>
      </button>
    </form>
  );
}
