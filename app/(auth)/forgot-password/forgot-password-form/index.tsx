'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from './forgot-password-schema';

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordValues) {
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

      {/* Submit */}
      <button
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-400 font-semibold text-black hover:cursor-pointer hover:bg-amber-500 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        <span>{isSubmitting ? 'Sending' : 'Send Reset'}</span>
      </button>
    </form>
  );
}
