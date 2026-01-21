'use client';

import { track } from '@vercel/analytics';
import { LucideChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import ICollection from '@/app/interface/collection';

export default function DeckLink({
  deck,
  isLast,
}: {
  deck: ICollection;
  isLast: boolean;
}) {
  return (
    <Link
      href={`/${deck.slug}`}
      onClick={() => {
        track('deck_opened', {
          slug: deck.slug,
          name: deck.name,
          word_count: deck.word_count,
        });
      }}
    >
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
}
