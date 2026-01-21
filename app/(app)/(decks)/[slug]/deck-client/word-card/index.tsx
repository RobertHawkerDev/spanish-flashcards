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
    <div className="mb-6 flex w-full items-center justify-center">
      <div className="size-full perspective-[1000px]">
        <div
          className={clsx(
            'relative flex size-full h-80 w-full items-center justify-center rounded-xl border-2 bg-white text-black transition-transform duration-500 transform-3d hover:cursor-pointer sm:h-96',
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
            <div className="flex h-full w-full flex-col items-center justify-start pt-10 sm:pt-12">
              <div className="flex h-36 items-center justify-center">
                <div className="relative size-32 sm:size-36">
                  <Image
                    src={`/words/${word.icon_svg}`}
                    fill
                    alt={word.english}
                    className="pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>

              <p className="pointer-events-none mt-7 text-center text-2xl font-semibold select-none sm:text-3xl">
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
            <div className="flex h-full w-full flex-col items-center justify-start pt-10 sm:pt-12">
              <div className="flex h-36 items-center justify-center sm:h-36">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-neutral-200 p-5 text-black hover:bg-neutral-300"
                  onClick={event => {
                    event.stopPropagation();
                    handleWordPronunciation(event, word);
                  }}
                >
                  <LucideVolume2 size={24} />
                </button>
              </div>

              <p className="pointer-events-none text-center text-2xl font-semibold select-none sm:text-3xl">
                {word.spanish_article} {word.spanish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
