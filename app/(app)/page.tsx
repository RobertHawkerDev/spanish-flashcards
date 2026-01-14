import { LucideChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { decks } from '../data/decks';

export default function HomePage() {
  return (
    <main className="bg-neutral-50 p-4 sm:p-10">
      <h1 className="text-2xl font-bold">Flashcard Decks</h1>
      <div className="mt-4 grid grid-cols-1 overflow-hidden rounded-lg sm:mt-10 sm:grid-cols-4 sm:gap-10">
        {decks.map(deck => {
          return (
            <Link href="/" key={deck.id}>
              <div className="flex flex-row items-start justify-between border-b border-b-neutral-300 bg-white py-4 sm:flex-col sm:rounded-lg sm:border-2 sm:border-black sm:p-6">
                <div className="flex flex-row items-start gap-8">
                  <div className="relative h-12 w-12 sm:h-24 sm:w-24">
                    <Image fill alt="" src={deck.icon_svg} />
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
