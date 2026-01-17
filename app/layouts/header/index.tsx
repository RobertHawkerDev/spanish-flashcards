import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className={`sticky top-0 z-30 flex h-18 w-full flex-row items-center justify-between border-b border-b-neutral-300 bg-white px-4 sm:px-10`}
    >
      <div className="flex w-full flex-row items-center justify-center">
        <Link className="flex flex-row items-center text-xl" href="/">
          <div className="relative mr-2 h-8 w-8">
            <Image alt="" fill src={'/logo.svg'} />
          </div>
          <span className="mr-1 font-bold text-black">Spanish</span>
          <span className="font-bold text-black">Flashcards</span>
        </Link>
      </div>
    </header>
  );
}
