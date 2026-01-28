import Image from 'next/image';

import IWord from '@/app/interfaces/word';

import WordCardAudioButton from './word-card-audio-button';

export default function WordCard({
  word,
  isLast,
}: {
  word: IWord;
  isLast: boolean;
}) {
  return (
    <div
      className={[
        'flex items-center justify-between gap-4 px-5 py-4 sm:gap-6 sm:px-6',
        'transition-colors',
        'hover:bg-neutral-50 dark:hover:bg-neutral-800/80',
        isLast ? '' : 'border-b border-b-neutral-200 dark:border-b-neutral-700',
      ].join(' ')}
    >
      <div className="flex min-w-0 items-center gap-5 sm:gap-8">
        <div className="relative size-12 shrink-0 sm:size-14">
          <Image
            fill
            alt={`${word.english} icon`}
            src={`/words/${word.icon_svg}`}
            className="pointer-events-none select-none"
            draggable={false}
            sizes="56px"
          />
        </div>

        <div className="min-w-0">
          <p className="line-clamp-2 text-base font-semibold wrap-anywhere text-neutral-900 sm:text-lg dark:text-neutral-50">
            {word.spanish_article} {word.spanish}
          </p>
          <p className="truncate text-sm font-medium text-neutral-600 sm:text-base dark:text-neutral-300">
            {word.english}
          </p>
        </div>
      </div>

      <WordCardAudioButton word={word} />
    </div>
  );
}
