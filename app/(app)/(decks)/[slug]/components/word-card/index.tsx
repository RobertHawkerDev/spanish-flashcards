'use client';

import { LucideCheck, LucideMic, LucideX } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function WordCard({
  word,
  onMark,
}: {
  word: {
    icon_svg: string;
    english: string;
    spanish_article: string;
    spanish: string;
  };
  onMark?: (result: 'correct' | 'wrong') => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const spanishFull = useMemo(() => {
    const article = word.spanish_article?.trim();
    const spanish = word.spanish?.trim();
    return [article, spanish].filter(Boolean).join(' ');
  }, [word.spanish_article, word.spanish]);

  function speak() {
    globalThis.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(word.spanish);
    utterance.lang = 'es-ES';
    globalThis.speechSynthesis?.speak(utterance);
  }

  const markAndExit = (result: 'correct' | 'wrong') => {
    if (isLeaving) return;
    setIsLeaving(true);

    // match duration-300 below
    globalThis.setTimeout(() => {
      onMark?.(result);
    }, 300);
  };

  return (
    <div
      className={[
        'h-72 w-full perspective-distant',
        'transition-all duration-300',
        isLeaving ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
      ].join(' ')}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Flashcard for ${word.english}`}
        onClick={() => !isLeaving && setIsFlipped(v => !v)}
        onKeyDown={event => {
          if (isLeaving) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsFlipped(v => !v);
          }
        }}
        className={[
          'relative h-full w-full cursor-pointer rounded-xl border-2 border-black bg-white',
          'transition-transform duration-500 transform-3d',
          isFlipped ? 'transform-[rotateY(180deg)]' : '',
          isLeaving ? 'pointer-events-none' : '',
        ].join(' ')}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 backface-hidden">
          <div className="relative size-28">
            <Image
              alt={word.english}
              src={`/words/${word.icon_svg}`}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
          <p className="mt-6 text-center text-xl font-semibold">
            {word.english}
          </p>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex transform-[rotateY(180deg)] flex-col items-center justify-center gap-6 p-8 backface-hidden">
          <button
            className="cursor-pointer rounded-full bg-neutral-200 p-3 hover:bg-neutral-300"
            type="button"
            onClick={event => {
              event.stopPropagation();
              speak();
            }}
            aria-label={`Listen to pronunciation of ${word.spanish}`}
          >
            <LucideMic className="h-8 w-8 text-neutral-900" />
          </button>

          <p className="text-center text-2xl font-semibold">{spanishFull}</p>

          <div className="mt-2 flex gap-5">
            <button
              className="cursor-pointer rounded-full bg-red-500 p-2 hover:bg-red-600"
              type="button"
              onClick={event => {
                event.stopPropagation();
                markAndExit('wrong');
              }}
              aria-label="Mark wrong"
            >
              <LucideX className="h-8 w-8 text-white" />
            </button>

            <button
              className="cursor-pointer rounded-full bg-green-500 p-2 hover:bg-green-600"
              type="button"
              onClick={event => {
                event.stopPropagation();
                markAndExit('correct');
              }}
              aria-label="Mark correct"
            >
              <LucideCheck className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
