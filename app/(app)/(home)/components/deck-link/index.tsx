'use client';

import { track } from '@vercel/analytics';
import Image from 'next/image';
import Link from 'next/link';

import IDeck from '@/app/interface/deck';

export default function DeckLink({ deck }: { deck: IDeck }) {
  return (
    <Link
      className="h-full"
      href={`/${deck.slug}`}
      onClick={() => {
        const payload = {
          deck_slug: deck.slug,
          word_count: deck.word_count,
        };

        track('deck_opened', payload);
      }}
    >
      <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-lg border border-neutral-300 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:ring-1 dark:shadow-black/50 dark:ring-white/5">
        <div className="flex flex-col items-center p-4 md:p-6">
          <div className="relative size-20 md:size-24">
            <Image
              className="pointer-events-none select-none"
              draggable={false}
              fill
              alt={`${deck.name} icon`}
              src={deck.icon_svg}
            />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mt-4 text-center text-base font-semibold md:text-lg dark:text-neutral-100">
              {deck.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-neutral-700 md:text-base dark:text-neutral-400">
              {deck.word_count} words
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
