import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
      <div className="container-x mx-auto flex h-16 w-full max-w-7xl flex-row items-center 2xl:h-18">
        <Link href="/" className="flex items-center">
          <div className="relative mr-2 size-7 2xl:size-8">
            <Image
              className="pointer-events-none select-none"
              alt=""
              fill
              src="/logo.svg"
            />
          </div>
          <span className="text-lg font-bold text-neutral-900 2xl:text-xl dark:text-neutral-50">
            Spanish Flashcards
          </span>
        </Link>
      </div>
    </header>
  );
}
