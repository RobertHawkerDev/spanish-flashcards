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
        'relative w-full',
        'transition-all duration-300',
        isLeaving ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
      ].join(' ')}
    >
      {/* CARD (tap anywhere to flip) */}
      <button
        type="button"
        disabled={isLeaving}
        onClick={() => setIsFlipped(v => !v)}
        className={[
          'relative h-72 w-full cursor-pointer rounded-xl border-2 border-black bg-white',
          'perspective-distant',
          'transition-transform duration-500 transform-3d',
          isFlipped ? 'transform-[rotateY(180deg)]' : '',
          isLeaving ? 'pointer-events-none' : '',
        ].join(' ')}
        aria-label={`Flashcard for ${word.english}`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 backface-hidden">
          <div className="relative size-28">
            <Image
              alt={word.english}
              src={`/words/${word.icon_svg}`}
              fill
              className="pointer-events-none select-none"
              sizes="96px"
              draggable={false}
            />
          </div>
          <p className="mt-6 text-center text-xl font-semibold select-none">
            {word.english}
          </p>
          <p className="text-center text-sm text-neutral-500 select-none">
            Tap to reveal
          </p>
        </div>

        {/* BACK (text only, no buttons inside 3D!) */}
        <div className="absolute inset-0 flex transform-[rotateY(180deg)] flex-col items-center justify-center gap-3 p-8 backface-hidden">
          <p className="text-center text-3xl font-semibold select-none">
            {spanishFull}
          </p>
          <p className="text-center text-sm text-neutral-500 select-none">
            Tap to flip back
          </p>
        </div>
      </button>

      {/* CONTROLS: outside the 3D transform (reliable taps) */}
      {isFlipped ? (
        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            className="cursor-pointer rounded-full bg-neutral-200 p-3 hover:bg-neutral-300"
            type="button"
            onClick={speak}
            aria-label={`Listen to pronunciation of ${word.spanish}`}
          >
            <LucideMic className="h-8 w-8 text-neutral-900" />
          </button>

          <button
            className="cursor-pointer rounded-full bg-red-500 p-3 hover:bg-red-600"
            type="button"
            onClick={() => markAndExit('wrong')}
            aria-label="Mark wrong"
          >
            <LucideX className="h-8 w-8 text-white" />
          </button>

          <button
            className="cursor-pointer rounded-full bg-green-500 p-3 hover:bg-green-600"
            type="button"
            onClick={() => markAndExit('correct')}
            aria-label="Mark correct"
          >
            <LucideCheck className="h-8 w-8 text-white" />
          </button>
        </div>
      ) : undefined}
    </div>
  );
}
