'use client';

import { LucideCheck, LucideMic, LucideX } from 'lucide-react';
import Image from 'next/image';

export default function WordCard({
  word,
}: {
  word: {
    icon_svg: string;
    english: string;
    spanish_article: string;
    spanish: string;
  };
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-black p-10">
      <div className="relative h-24 w-24">
        <Image alt="" src={`/words/${word.icon_svg}`} fill />
      </div>
      <p>{word.english}</p>
      <p>
        {word.spanish_article} {word.spanish}
      </p>
      <button
        className="mb-2 cursor-pointer rounded-full bg-neutral-200 p-3 hover:bg-neutral-300"
        type="button"
        onClick={event => {
          event.stopPropagation();
          globalThis.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(word.spanish);
          utterance.lang = 'es-ES';
          globalThis.speechSynthesis.speak(utterance);
        }}
        aria-label={`Listen to pronunciation of ${word.spanish}`}
      >
        <LucideMic className="h-8 w-8 text-neutral-900" />
      </button>
      <div className="mt-2 flex gap-5">
        <button
          className="cursor-pointer rounded-full bg-red-500 p-2 hover:bg-red-600"
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <LucideX className="h-8 w-8 text-white" />
        </button>

        <button
          className="cursor-pointer rounded-full bg-green-500 p-2 hover:bg-green-600"
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <LucideCheck className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
