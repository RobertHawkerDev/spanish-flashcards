import { LucideHome } from 'lucide-react';
import Link from 'next/link';

import DefaultLayout from './layouts/default-layout';

export default function NotFound() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center py-16">
        <h1 className="text-5xl font-bold">404 - Not Found</h1>
        <p className="mt-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          className="mt-10 flex items-center justify-center rounded-full bg-black px-8 py-4 font-semibold text-white hover:bg-neutral-800"
          href="/"
        >
          <LucideHome size={20} />
          <p className="ml-2">Home</p>
        </Link>
      </div>
    </DefaultLayout>
  );
}
