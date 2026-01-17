'use client';

import { useState } from 'react';

import WordCard from '../word-card';

type MarkResult = 'correct' | 'wrong';

type Word = {
  id: string | number;
  icon_svg: string;
  english: string;
  spanish_article: string;
  spanish: string;
};

function deckTransforms(level: 0 | 1 | 2) {
  if (level === 0) return 'translateY(0px) scale(1)';
  if (level === 1) return 'translateY(10px) scale(0.97)';
  return 'translateY(20px) scale(0.94)';
}

export default function WordDeck({
  words,
  onMark,
  onComplete,
}: {
  words: Word[];
  onMark?: (result: MarkResult) => void;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);

  const total = words.length;
  const remaining = total - index;

  const top = words[index];
  const second = words[index + 1];
  const third = words[index + 2];

  const handleMark = (result: MarkResult) => {
    onMark?.(result);

    setIndex(previous => {
      const next = previous + 1;
      if (next >= total) {
        queueMicrotask(() => onComplete?.());
        return previous;
      }
      return next;
    });
  };

  if (!top) return;

  return (
    <div className="mt-8 flex w-full justify-center">
      <div className="relative w-full max-w-[420px]">
        <div className="relative isolate h-[320px]">
          {third ? (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                transform: deckTransforms(2),
                transition: 'transform 220ms ease-in-out',
                zIndex: 1,
              }}
              aria-hidden="true"
            >
              <WordCard key={third.id} word={third} />
            </div>
          ) : undefined}

          {second ? (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                transform: deckTransforms(1),
                transition: 'transform 220ms ease-in-out',
                zIndex: 2,
              }}
              aria-hidden="true"
            >
              <WordCard key={second.id} word={second} />
            </div>
          ) : undefined}

          <div
            className="pointer-events-auto absolute inset-0"
            style={{ zIndex: 3, transition: 'transform 220ms ease-in-out' }}
          >
            <WordCard key={top.id} word={top} onMark={handleMark} />
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-neutral-600">
          {remaining} of {total} remaining
        </div>
      </div>
    </div>
  );
}
