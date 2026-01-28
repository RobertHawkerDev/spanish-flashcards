'use client';

import { track } from '@vercel/analytics';
import { LucideCheck, LucideX } from 'lucide-react';
import { useRef } from 'react';

import IWord from '@/app/interfaces/word';

import ProgressBar from '../progress-bar';
import WordCard from '../word-card';

export default function FlashcardDeck({
  current,
  total,
  word,
  title,
  deckSlug,
  onWrong,
  onCorrect,
  onFirstFlip,
}: {
  current: number;
  title: string;
  total: number;
  word: IWord;
  deckSlug: string;
  onWrong: () => void;
  onCorrect: () => void;
  onFirstFlip: (cardIndex: number) => void;
}) {
  const answeredKeyReference = useRef<string | null>(null);

  const handleAnswer = (correct: boolean) => {
    const answerKey = `${word.id}:${current}`;
    if (answeredKeyReference.current !== answerKey) {
      track(correct ? 'answer_correct' : 'answer_incorrect', {
        deck_slug: deckSlug,
        card_index: current,
      });
      answeredKeyReference.current = answerKey;
    }

    if (correct) onCorrect();
    else onWrong();
  };

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="flex flex-1 flex-col gap-5 sm:gap-6 lg:gap-7">
        <ProgressBar
          label={title}
          showCount={true}
          current={current}
          total={total}
          className="pt-1"
        />

        <WordCard
          key={word.id}
          word={word}
          deckSlug={deckSlug}
          cardIndex={current}
          onFirstFlip={onFirstFlip}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => handleAnswer(false)}
            className={[
              'flex flex-col items-center justify-center gap-3 rounded-xl border bg-white px-5 py-4 hover:cursor-pointer sm:py-5',
              'min-h-24 sm:min-h-28', // optional but helps consistency across devices
              'border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
              'transition active:scale-[0.99]',
              'hover:bg-neutral-50',
              'dark:border-neutral-700 dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
              'dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
            ].join(' ')}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-white sm:size-12">
              <LucideX />
            </span>
            <span className="pointer-events-none text-sm font-semibold text-neutral-900 select-none sm:text-base dark:text-neutral-50">
              Incorrect
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleAnswer(true)}
            className={[
              'flex flex-col items-center justify-center gap-3 rounded-xl border bg-white px-5 py-4 hover:cursor-pointer sm:py-5',
              'min-h-24 sm:min-h-28', // optional but helps consistency across devices
              'border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
              'transition active:scale-[0.99]',
              'hover:bg-neutral-50',
              'dark:border-neutral-700 dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
              'dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
            ].join(' ')}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-white sm:size-12">
              <LucideCheck />
            </span>
            <span className="pointer-events-none text-sm font-semibold text-neutral-900 select-none sm:text-base dark:text-neutral-50">
              Correct
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
