'use client';

import { track } from '@vercel/analytics';
import clsx from 'clsx';
import { LucideVolume2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import IWord from '@/app/interface/word';

import handleWordPronunciation from './handle-pronunciation';

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
      if (process.env.NODE_ENV === 'development') {
        console.log('EVENT card_flipped', {
          deck_slug: deckSlug,
          card_index: cardIndex,
        });
      }
      track('card_flipped', { deck_slug: deckSlug, card_index: cardIndex });

      hasTrackedFlip.current = true;
      onFirstFlip?.(cardIndex);
    }

    setFlipped(v => !v);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="size-full perspective-[1000px]">
        <div
          className={clsx(
            'relative flex size-full h-80 w-full items-center justify-center rounded-xl border-2 border-neutral-900 bg-white text-black transition-transform duration-500 transform-3d hover:cursor-pointer sm:h-96',
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
            <div className="flex h-full w-full flex-col items-center justify-start pt-10 sm:pt-18">
              <div className="flex h-36 items-center justify-center">
                <div className="relative size-32 sm:size-36">
                  <Image
                    src={`/words/${word.icon_svg}`}
                    fill
                    alt={`${word.spanish_article} ${word.spanish} — ${word.english}`}
                    className="pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>

              <p className="pointer-events-none mt-6 text-center text-3xl font-bold select-none">
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
            <div className="flex h-full w-full flex-col items-center justify-start pt-10 sm:pt-16">
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-4 text-black hover:cursor-pointer hover:bg-neutral-200"
                onClick={event => {
                  event.stopPropagation();
                  handleWordPronunciation(event, word);
                }}
              >
                <LucideVolume2 size={24} />
              </button>

              <p className="pointer-events-none mt-8 text-center text-3xl font-bold select-none sm:text-4xl">
                {word.spanish_article} {word.spanish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
