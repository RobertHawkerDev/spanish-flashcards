'use client';

import { LucideRotateCcw, LucideX } from 'lucide-react';
import { useMemo, useState } from 'react';

import WordDeck from '../word-deck';
import CollectionGrid from '../word-grid';

type Word = {
  id: string | number;
  icon_svg: string;
  english: string;
  spanish_article: string;
  spanish: string;
};

type MarkResult = 'correct' | 'wrong';

export default function DeckClient({
  title,
  words,
}: {
  title: string;
  words: Word[];
}) {
  const total = useMemo(() => words.length, [words]);

  const [resetKey, setResetKey] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const resetDeck = () => {
    setResetKey(k => k + 1);
    setCorrect(0);
    setWrong(0);
    setIsDone(false);
  };

  const handleMark = (result: MarkResult) => {
    if (result === 'correct') setCorrect(c => c + 1);
    else setWrong(w => w + 1);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>

        <button
          type="button"
          onClick={resetDeck}
          className="flex min-w-36 cursor-pointer items-center justify-center rounded-full bg-black p-4 text-white hover:bg-neutral-800"
        >
          <LucideRotateCcw size={20} className="mr-2" />
          <span className="text-base font-semibold">Reset</span>
        </button>
      </div>

      <div className="block md:hidden">
        <WordDeck
          key={resetKey}
          words={words}
          onMark={handleMark}
          onComplete={() => setIsDone(true)}
        />
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:block">
        <CollectionGrid
          key={resetKey}
          words={words}
          onMark={handleMark}
          onComplete={() => setIsDone(true)}
        />
      </div>

      {/* Modal */}
      {isDone ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Deck results"
          onClick={() => setIsDone(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">Deck complete</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Here are your results for{' '}
                  <span className="font-semibold">{title}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDone(false)}
                className="rounded-full p-2 hover:bg-neutral-100"
                aria-label="Close"
              >
                <LucideX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Total</span>
                <span className="text-base font-semibold">{total}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Correct</span>
                <span className="text-base font-semibold">{correct}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Wrong</span>
                <span className="text-base font-semibold">{wrong}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={resetDeck}
                className="flex-1 rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-neutral-800"
              >
                Reset deck
              </button>
              <button
                type="button"
                onClick={() => setIsDone(false)}
                className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 font-semibold hover:bg-neutral-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
}
