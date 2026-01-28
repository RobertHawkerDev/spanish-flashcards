import { LucideHome } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description:
    'Not found. The page you are looking for does not exist or has moved. Head back to the home page and keep learning Spanish.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center px-5 py-10 md:py-12">
      <h1 className="text-center text-3xl font-bold text-neutral-900 sm:text-5xl dark:text-neutral-50">
        404 - Not Found
      </h1>

      <p className="mt-5 max-w-md text-center text-base font-medium text-neutral-700 sm:mt-7 dark:text-neutral-200">
        The page you are looking for does not exist or has moved. Head back to
        the home page and keep learning Spanish.
      </p>

      <Link
        href="/"
        className={[
          'mt-6 flex max-w-96 min-w-52 items-center justify-center rounded-full',
          'bg-amber-400 px-6 py-4 text-center font-semibold text-neutral-900',
          'transition hover:cursor-pointer hover:bg-amber-500 active:scale-[0.99]',
          'focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:outline-none',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          'dark:focus-visible:ring-offset-neutral-950',
        ].join(' ')}
      >
        <LucideHome className="mr-2" size={20} aria-hidden="true" />
        <span className="text-base">Home</span>
      </Link>
    </main>
  );
}
