'use client';

import { LucideVolume2 } from 'lucide-react';

import IWord from '@/app/interfaces/word';
import handleWordPronunciation from '@/app/utils/pronunciation/handle-pronunciation';

export default function WordCardAudioButton({ word }: { word: IWord }) {
  return (
    <button
      type="button"
      aria-label={`Play pronunciation for ${word.spanish}`}
      title={`Play pronunciation for ${word.spanish}`}
      className={[
        'flex size-10 items-center justify-center rounded-full',
        'bg-neutral-100 hover:cursor-pointer hover:bg-neutral-200',
        'dark:bg-neutral-800 dark:hover:bg-neutral-700',
        'transition active:scale-[0.97]',
        'focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:outline-none',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        'dark:focus-visible:ring-offset-neutral-900',
      ].join(' ')}
      onClick={event => handleWordPronunciation(event, word)}
    >
      <LucideVolume2 size={20} />
    </button>
  );
}
