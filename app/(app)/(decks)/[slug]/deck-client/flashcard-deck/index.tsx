import { LucideCheck, LucideX } from 'lucide-react';

import IWord from '@/app/interface/word';

import WordCard from '../word-card';

export default function FlashcardDeck({
  current,
  total,
  word,
  title,
  onWrong,
  onCorrect,
}: {
  current: number;
  title: string;
  total: number;
  word: IWord;
  onWrong: () => void;
  onCorrect: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center py-6">
      <div className="w-full max-w-4xl px-4">
        {/* Heading */}
        <div className="mb-5 flex flex-col items-center">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2.5 text-sm font-medium text-neutral-800">
            {current}
            <span className="mx-1 text-neutral-800">/</span>
            {total}
          </p>
        </div>

        {/* Card */}
        <WordCard key={word.id} word={word} />

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={onWrong}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-white py-4 transition hover:cursor-pointer hover:bg-red-50 active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
                <LucideX />
              </span>
              <span className="text-base font-semibold">Incorrect</span>
            </button>

            <button
              type="button"
              onClick={onCorrect}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-white py-4 transition hover:cursor-pointer hover:bg-green-50 active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                <LucideCheck />
              </span>
              <span className="text-base font-semibold">Correct</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
