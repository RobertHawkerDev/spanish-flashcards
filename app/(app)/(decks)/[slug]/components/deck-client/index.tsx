'use client';

import { LucideRotateCcw } from 'lucide-react';
import { useState } from 'react';

import CollectionGrid from '../word-grid';

type Word = {
  id: string | number;
  icon_svg: string;
  english: string;
  spanish_article: string;
  spanish: string;
};

export default function DeckClient({
  title,
  words,
}: {
  title: string;
  words: Word[];
}) {
  const [resetKey, setResetKey] = useState(0);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>

        <button
          type="button"
          onClick={() => setResetKey(k => k + 1)}
          className="flex min-w-36 cursor-pointer items-center justify-center rounded-full bg-black p-4 text-white hover:bg-neutral-800"
        >
          <LucideRotateCcw size={20} className="mr-2" />
          <span className="text-base font-semibold">Reset</span>
        </button>
      </div>

      {/* key forces a clean remount (grid + cards) */}
      <CollectionGrid key={resetKey} words={words} />
    </>
  );
}
