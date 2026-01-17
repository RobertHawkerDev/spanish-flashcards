import type { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

import ResetEmailForm from './reset-email-form';

export const metadata: Metadata = {
  title: 'Reset Email',
  description: `Reset or update the email address for your ${companyName} account. Keep your progress, settings, and saved learning data.`,
};

export default function ResetEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-6 sm:bg-neutral-100 sm:pt-6">
      <div className="flex w-full flex-col items-center">
        {/* Card */}
        <section className="mt-6 w-full max-w-lg px-0 py-0 sm:mt-12 sm:rounded-2xl sm:bg-white sm:p-10 sm:shadow-lg sm:ring-1 sm:shadow-black/30 sm:ring-black/5">
          <h1 className="text-left text-xl font-extrabold sm:text-center sm:text-2xl">
            Reset Email
          </h1>
          <ResetEmailForm />
        </section>
      </div>
    </main>
  );
}
