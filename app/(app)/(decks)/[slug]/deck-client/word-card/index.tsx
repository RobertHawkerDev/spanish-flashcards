'use client';

import clsx from 'clsx';
import { LucideVolume2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import IWord from '@/app/interface/word';

import handleWordPronunciation from './handle-pronunciation';

type FlipDirection = 'horizontal' | 'vertical';

export default function WordCard({
  word,
  flip = 'horizontal',
}: {
  word: IWord;
  flip?: FlipDirection;
}) {
  const [flipped, setFlipped] = useState(false);

  const containerRotation =
    flip === 'horizontal'
      ? 'transform-[rotateY(180deg)]'
      : 'transform-[rotateX(180deg)]';

  const backFaceRotation =
    flip === 'horizontal'
      ? 'transform-[rotateY(180deg)]'
      : 'transform-[rotateX(180deg)]';

  return (
    <div className="size-96 w-full hover:cursor-pointer">
      <div className="size-full perspective-[1000px]">
        <div
          className={clsx(
            'relative size-full rounded-xl border-2 bg-white text-black transition-transform duration-500 transform-3d',
            flipped && containerRotation,
          )}
          onClick={() => setFlipped(v => !v)}
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') setFlipped(v => !v);
          }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="relative size-40">
                <Image
                  src={`/words/${word.icon_svg}`}
                  fill
                  alt={word.english}
                />
              </div>
              <h2 className="mt-8 text-2xl font-semibold">{word.english}</h2>
            </div>
          </div>

          {/* BACK */}
          <div
            className={clsx(
              'absolute inset-0 backface-hidden',
              backFaceRotation,
            )}
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-6">
              <button
                type="button"
                className="flex items-center justify-center rounded-full bg-neutral-200 p-4 text-black hover:cursor-pointer hover:bg-neutral-300"
                onClick={event => {
                  event.stopPropagation();
                  handleWordPronunciation(event, word);
                }}
              >
                <LucideVolume2 size={24} />
              </button>

              <p className="text-2xl font-semibold">
                {word.spanish_article} {word.spanish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
