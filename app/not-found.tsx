import { LucideHome } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import companyName from './utils/company-name';

export const metadata: Metadata = {
  title: '404 - Not Found',
  description: `Page not found. The page you’re looking for doesn’t exist or has moved. Head back to ${companyName} and keep building your Spanish vocabulary.`,
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center px-5 py-10 md:py-12">
      <h1 className="text-center text-3xl font-bold sm:text-5xl">
        404 - Not Found
      </h1>
      <p className="mt-5 text-center sm:mt-7">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        className="mt-7 flex items-center justify-center rounded-full bg-black px-8 py-4 font-semibold text-white hover:bg-neutral-800 sm:mt-9"
        href="/"
      >
        <LucideHome size={20} />
        <p className="ml-2">Home</p>
      </Link>
    </main>
  );
}
