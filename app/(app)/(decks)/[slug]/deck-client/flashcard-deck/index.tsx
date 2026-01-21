'use client';

import { track } from '@vercel/analytics';
import { LucideCheck, LucideX } from 'lucide-react';
import { useRef } from 'react';

import IWord from '@/app/interface/word';

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
  // prevents double-firing on spam clicks for the same card
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
    <div className="flex flex-1 flex-col items-center py-6">
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <div className="mb-5 flex flex-col items-center">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm font-medium text-neutral-800">
            {current}
            <span className="mx-1 text-neutral-800">/</span>
            {total}
          </p>
        </div>

        {/* Card */}
        <WordCard
          key={word.id}
          word={word}
          deckSlug={deckSlug}
          cardIndex={current}
          onFirstFlip={onFirstFlip}
        />

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={() => handleAnswer(false)}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-white py-4 transition hover:cursor-pointer hover:bg-red-50 active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
                <LucideX />
              </span>
              <span className="pointer-events-none text-base font-semibold select-none">
                Incorrect
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleAnswer(true)}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-white py-4 transition hover:cursor-pointer hover:bg-green-50 active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                <LucideCheck />
              </span>
              <span className="pointer-events-none text-base font-semibold select-none">
                Correct
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
