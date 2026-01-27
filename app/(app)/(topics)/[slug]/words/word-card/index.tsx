'use client';

import { LucideVolume2 } from 'lucide-react';
import Image from 'next/image';

import IWord from '@/app/interfaces/word';
import handleWordPronunciation from '@/app/utils/pronunciation/handle-pronunciation';

export default function WordCard({
  word,
  isLast,
}: {
  word: IWord;
  isLast: boolean;
}) {
  return (
    <div
      key={word.id}
      className={[
        'flex items-center justify-between gap-4 px-5 py-4 sm:gap-6 sm:px-6',
        'transition-colors',
        'hover:bg-neutral-50 dark:hover:bg-neutral-800/80',
        isLast ? '' : 'border-b border-b-neutral-200 dark:border-b-neutral-700',
      ].join(' ')}
    >
      <div className="flex flex-row gap-8">
        <div className="relative size-14 shrink-0">
          <Image
            fill
            alt={`${word.english} icon`}
            src={`/words/${word.icon_svg}`}
            className="pointer-events-none select-none"
            draggable={false}
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-neutral-900 sm:text-lg dark:text-neutral-50">
            {word.spanish_article} {word.spanish}
          </p>
          <p className="truncate text-base font-medium text-neutral-600 dark:text-neutral-300">
            {word.english}
          </p>
        </div>
      </div>
      <button
        className="flex size-10 items-center justify-center rounded-full bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200"
        onClick={event => handleWordPronunciation(event, word)}
      >
        <LucideVolume2 size={20} />
      </button>
    </div>
  );
}
