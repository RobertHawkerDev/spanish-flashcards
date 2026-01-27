'use client';

import { track } from '@vercel/analytics';
import clsx from 'clsx';
import { LucideVolume2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import IWord from '@/app/interfaces/word';
import handleWordPronunciation from '@/app/utils/pronunciation/handle-pronunciation';

export default function WordCard({
  word,
  deckSlug,
  cardIndex,
  onFirstFlip,
}: {
  word: IWord;
  deckSlug: string;
  cardIndex: number;
  onFirstFlip?: (cardIndex: number) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const hasTrackedFlip = useRef(false);

  const containerRotation = 'transform-[rotateX(180deg)]';
  const backFaceRotation = 'transform-[rotateX(180deg)]';

  const flipToBack = () => {
    if (!flipped && !hasTrackedFlip.current) {
      track('card_flipped', { deck_slug: deckSlug, card_index: cardIndex });
      hasTrackedFlip.current = true;
      onFirstFlip?.(cardIndex);
    }
    setFlipped(v => !v);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full perspective-[1000px]">
        <div
          className={clsx(
            [
              'relative min-h-60 w-full rounded-xl border bg-white transition-transform duration-500 transform-3d sm:h-96',
              'border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
              'text-neutral-900',
              'hover:cursor-pointer',
              'dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-50',
              'dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
            ].join(' '),
            flipped && containerRotation,
          )}
          onClick={flipToBack}
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              flipToBack();
            }
          }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden">
            <div className="flex h-full w-full flex-col items-center justify-start pt-10 sm:pt-16">
              <div className="flex items-center justify-center">
                <div className="relative size-24 md:size-36">
                  <Image
                    src={`/words/${word.icon_svg}`}
                    fill
                    alt={`${word.spanish_article} ${word.spanish} — ${word.english}`}
                    className="pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>

              <p className="pointer-events-none mt-5 text-center text-2xl font-bold select-none md:mt-8 md:text-3xl">
                {word.english}
              </p>
            </div>
          </div>

          {/* BACK */}
          <div
            className={clsx(
              'absolute inset-0 backface-hidden',
              backFaceRotation,
            )}
          >
            <div className="flex h-full w-full flex-col items-center justify-start pt-10 sm:pt-14">
              <button
                type="button"
                className="rounded-full p-4 text-neutral-900 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800/80"
                onClick={event => {
                  event.stopPropagation();
                  handleWordPronunciation(event, word);
                }}
              >
                <LucideVolume2 size={24} />
              </button>

              <p className="pointer-events-none mt-4 text-center text-2xl font-bold select-none sm:text-3xl">
                {word.spanish_article} {word.spanish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
