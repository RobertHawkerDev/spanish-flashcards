import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className={`top-0 z-30 flex h-16 w-full flex-row items-center justify-start border-b border-b-neutral-300 bg-white px-5 sm:px-10 md:h-20`}
    >
      <div className="flex w-full flex-row items-center justify-start">
        <Link className="flex flex-row items-center text-lg" href="/">
          <div className="relative mr-2 h-8 w-8">
            <Image
              className="pointer-events-none select-none"
              alt=""
              fill
              src={'/logo.svg'}
            />
          </div>
          <span className="mr-1 font-bold text-black">Spanish</span>
          <span className="font-bold text-black">Flashcards</span>
        </Link>
      </div>
    </header>
  );
}
