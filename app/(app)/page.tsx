import { LucideChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { decks } from '../data/decks';

export default function HomePage() {
  return (
    <main className="flex-1 bg-neutral-100 p-4 pb-10 sm:p-10 sm:py-12">
      <h1 className="mt-2 text-xl font-bold">Learn Spanish By Topic</h1>
      <div className="mt-6 grid grid-cols-1 rounded-xl border-neutral-300 bg-white px-4 shadow-md sm:mt-12 sm:grid-cols-4 sm:gap-10">
        {decks.map(deck => {
          return (
            <Link href={`/${deck.slug}`} key={deck.id}>
              <div className="flex flex-row items-center justify-between border-b border-b-neutral-300 bg-white py-3 sm:flex-col sm:rounded-lg sm:border-2 sm:border-black sm:p-6">
                <div className="flex flex-row items-center gap-5">
                  <div className="relative h-12 w-12 sm:h-24 sm:w-24">
                    <Image
                      className="pointer-events-none select-none"
                      draggable={false}
                      fill
                      alt=""
                      src={deck.icon_svg}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-bold sm:mt-2 sm:text-xl">
                      {deck.name}
                    </p>
                    <p className="text-sm sm:mt-2">{deck.word_count} words</p>
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
    </main>
  );
}
