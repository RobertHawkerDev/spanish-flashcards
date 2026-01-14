import type { Metadata } from 'next';
import Link from 'next/link';

import SignInForm from './reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password',
  description:
    'Reset you password to get back into your SpanishFlashcards account.',
};

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-6 sm:bg-neutral-100 sm:pt-12">
      <div className="flex w-full flex-col items-center">
        {/* Brand */}
        <Link className="text-xl sm:text-2xl" href="/">
          <span>🇪🇸</span>
          <span className="font-bold text-red-700"> Spanish</span>
          <span className="font-bold text-orange-500">Flashcards</span>
        </Link>

        {/* Card */}
        <section className="mt-6 w-full max-w-lg px-0 py-0 sm:mt-12 sm:rounded-2xl sm:bg-white sm:p-10 sm:shadow-lg sm:ring-1 sm:shadow-black/30 sm:ring-black/5">
          <h1 className="text-left text-xl font-extrabold sm:text-center sm:text-2xl">
            Reset Password
          </h1>

          <SignInForm />

          <p className="mt-8 text-center text-sm text-neutral-700 sm:mt-12">
            Remember your password?{' '}
            <Link
              href="/sign-in"
              className="font-semibold text-black hover:underline"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
      <div className="mt-8 flex flex-row gap-8 sm:mt-16">
        <Link
          href="/privacy-policy"
          className="text-sm text-neutral-800 hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-of-service"
          className="text-sm text-neutral-800 hover:underline"
        >
          Terms of Service
        </Link>
      </div>
    </main>
  );
}
