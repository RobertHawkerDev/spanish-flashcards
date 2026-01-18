'use client';

import {
  LucideCheck,
  LucideMic,
  LucideRefreshCcw,
  LucideX,
} from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import ICollection from '@/app/interface/collection';
import type IWord from '@/app/interface/word';

const EXIT_MS = 240;

export default function CardDeck({ collection }: { collection: ICollection }) {
  const words = useMemo(() => collection.words as IWord[], [collection.words]);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);

  const total = words.length;
  const done = index >= total;

  const current = words[index];
  const next1 = words[index + 1];
  const next2 = words[index + 2];

  function restart() {
    setIndex(0);
    setFlipped(false);
    setIsExiting(false);
    setRight(0);
    setWrong(0);
  }

  function answer(result: 'right' | 'wrong') {
    if (!current || isExiting) return;

    setIsExiting(true);

    globalThis.setTimeout(() => {
      if (result === 'right') setRight(r => r + 1);
      else setWrong(w => w + 1);

      setIndex(index_ => index_ + 1);
      setFlipped(false);
      setIsExiting(false);
    }, EXIT_MS);
  }

  // ✅ END SCREEN replaces the deck completely
  if (done) {
    const percent = total > 0 ? Math.round((right / total) * 100) : 0;

    return (
      <div className="mt-7 flex w-full flex-col">
        <h1 className="mb-2 text-4xl font-bold">{collection.name}</h1>

        <div className="mt-10 flex w-full flex-col items-center">
          <div className="relative z-10 flex w-[92%] max-w-md flex-col items-center rounded-2xl border-2 border-black bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold">Results</h2>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-neutral-100 p-3">
                <p className="text-sm text-neutral-600">Right</p>
                <p className="text-2xl font-bold">{right}</p>
              </div>
              <div className="rounded-xl bg-neutral-100 p-3">
                <p className="text-sm text-neutral-600">Wrong</p>
                <p className="text-2xl font-bold">{wrong}</p>
              </div>
              <div className="rounded-xl bg-neutral-100 p-3">
                <p className="text-sm text-neutral-600">Score</p>
                <p className="text-2xl font-bold">{percent}%</p>
              </div>
            </div>

            <button
              type="button"
              onClick={restart}
              className="mt-8 flex items-center gap-2.5 rounded-xl bg-black px-6 py-3 text-lg font-semibold text-white hover:cursor-pointer hover:opacity-90"
            >
              <LucideRefreshCcw />
              Replay
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal in-progress view
  return (
    <div className="mt-7 flex w-full flex-col">
      <div>
        <h1 className="mb-2 text-4xl font-bold">{collection.name}</h1>

        {/* COUNTERS */}
        <div className="mt-2 flex items-center justify-between gap-3 text-sm font-semibold text-neutral-700 sm:text-base">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-neutral-200 px-3 py-1">
              Right: <span className="text-black">{right}</span>
            </span>
            <span className="rounded-full bg-neutral-200 px-3 py-1">
              Wrong: <span className="text-black">{wrong}</span>
            </span>
            <span className="rounded-full bg-neutral-200 px-3 py-1">
              Total: <span className="text-black">{total}</span>
            </span>
          </div>

          <span className="text-neutral-600">
            {index + 1} / {total}
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center">
          {/* DECK */}
          <div className="relative h-88 w-1/2 perspective-distant">
            {/* 3rd card down */}
            {next2 && (
              <div className="absolute inset-0 translate-y-4 scale-[0.96] opacity-40 transition-all duration-300">
                <StaticCard word={next2} />
              </div>
            )}

            {/* 2nd card down */}
            {next1 && (
              <div className="absolute inset-0 translate-y-2 scale-[0.98] opacity-60 transition-all duration-300">
                <StaticCard word={next1} />
              </div>
            )}

            {/* TOP card */}
            {current && (
              <div
                className={[
                  'absolute inset-0',
                  'transition-[opacity,transform] ease-out',
                  isExiting
                    ? `duration-[${EXIT_MS}ms] transform-[translateZ(80px)] opacity-0`
                    : 'transform-[translateZ(0px)] opacity-100 duration-300',
                ].join(' ')}
                style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
                onClick={() => setFlipped(v => !v)}
                role="button"
                tabIndex={0}
              >
                <FlippingCard
                  key={current.id}
                  word={current}
                  flipped={flipped}
                />
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-row items-center gap-5">
            <button
              type="button"
              disabled={isExiting}
              onClick={() => answer('wrong')}
              className="flex items-center justify-center rounded-full bg-red-500 p-4 text-white hover:cursor-pointer hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Wrong"
            >
              <LucideX size={36} />
            </button>

            <button
              type="button"
              disabled={isExiting}
              onClick={() => answer('right')}
              className="flex items-center justify-center rounded-full bg-green-500 p-4 text-white hover:cursor-pointer hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Right"
            >
              <LucideCheck size={36} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function StaticCard({ word }: { word: IWord }) {
  return (
    <div className="h-full w-full">
      <div className="relative h-full rounded-2xl border-2 border-black bg-white px-16 py-12">
        <div className="absolute inset-0 flex flex-row items-center justify-between px-16 py-12">
          <div className="flex flex-1 items-center justify-start">
            <p className="text-3xl font-semibold">{word.english}</p>
          </div>
          <div className="relative aspect-square h-48">
            <Image fill alt="" src={`/words/${word.icon_svg}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FlippingCard({ word, flipped }: { word: IWord; flipped: boolean }) {
  function speak(event: React.MouseEvent) {
    event.stopPropagation();
    globalThis.speechSynthesis?.cancel();
    const u = new SpeechSynthesisUtterance(word.spanish);
    u.lang = 'es-ES';
    globalThis.speechSynthesis?.speak(u);
  }

  return (
    <div className="h-full w-full">
      <div
        className={[
          'relative h-full rounded-2xl border-2 border-black bg-white px-16 py-12',
          'transition-transform duration-500 transform-3d hover:cursor-pointer',
          flipped ? 'transform-[rotateX(180deg)]' : '',
        ].join(' ')}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 flex flex-row items-center justify-between px-16 py-12 backface-hidden">
          <div className="flex flex-1 items-center justify-start">
            <p className="text-3xl font-semibold">{word.english}</p>
          </div>

          <div className="relative aspect-square h-48">
            <Image fill alt="" src={`/words/${word.icon_svg}`} />
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 flex transform-[rotateX(180deg)] items-center justify-center rounded-2xl text-4xl font-bold text-black backface-hidden">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={speak}
              className="mb-5 rounded-full bg-neutral-200 p-3 hover:cursor-pointer hover:bg-neutral-300"
              aria-label="Play audio"
            >
              <LucideMic className="h-8 w-8" />
            </button>
            <p>
              {word.spanish_article} {word.spanish}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
