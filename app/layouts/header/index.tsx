import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className={`sticky top-0 z-30 flex h-16 w-full flex-row items-center justify-between border-b border-b-neutral-300 bg-white px-4 sm:px-10`}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <Link className="flex flex-row items-center text-xl" href="/">
          <div className="relative mr-1 h-8 w-8">
            <Image alt="" fill src={'/logo.svg'} />
          </div>

          <span className="mr-1 font-bold text-[#D90127]">Spanish</span>
          <span className="font-bold text-orange-400">Flashcards</span>
        </Link>
        <div className="flex flex-row items-center gap-10">
          <Link href="/subscribe">Subscribe</Link>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
          <div className="relative aspect-square h-12 overflow-hidden rounded-full">
            <Image alt="Profile" objectFit="cover" fill src="/avatar.png" />
          </div>
        </div>
      </div>
    </header>
  );
}
