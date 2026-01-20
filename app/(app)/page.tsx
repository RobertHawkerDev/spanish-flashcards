import { LucideChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { decks } from '../data/decks';
import companyName from '../utils/company-name';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-neutral-100 p-4 px-6 sm:p-10 sm:py-8">
      <div className="flex-1">
        <h1 className="mt-2 text-lg font-bold sm:mt-0 sm:text-2xl">
          Learn Spanish with Flashcards
        </h1>
        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-300 sm:mt-10 sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:border-none md:grid-cols-3 lg:grid-cols-4">
          {decks.map((deck, index) => {
            const isLast = index === decks.length - 1;

            return (
              <Link href={`/${deck.slug}`} key={deck.id}>
                <div
                  className={[
                    'flex flex-row items-center justify-between bg-white px-3 py-3',
                    'border-b border-neutral-300',
                    isLast && 'border-b-0',
                    'sm:flex-col sm:rounded-lg sm:border-2 sm:border-black sm:p-6 sm:px-0',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className="flex flex-row items-center gap-5 sm:flex-col">
                    <div className="relative h-12 w-12 sm:size-28">
                      <Image
                        className="pointer-events-none select-none"
                        draggable={false}
                        fill
                        alt=""
                        src={deck.icon_svg}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-base font-bold sm:mt-1 sm:text-lg">
                        {deck.name}
                      </p>
                      <p className="text-sm sm:mt-1 sm:text-center">
                        {deck.word_count} words
                      </p>
                    </div>
                  </div>
                  <div className="sm:hidden">
                    <LucideChevronRight />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-neutral-600">
        <p>
          © {new Date().getFullYear()} {companyName}
        </p>
      </footer>
    </main>
  );
}
