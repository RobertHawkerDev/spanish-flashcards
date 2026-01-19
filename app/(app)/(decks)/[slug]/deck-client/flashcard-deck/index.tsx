import { LucideCheck, LucideX, RotateCcw, Undo2 } from 'lucide-react';

import IWord from '@/app/interface/word';

import WordCard from '../word-card';

type FlipDirection = 'horizontal' | 'vertical';

function FlashcardDeckHeader({
  current,
  total,
  title,
}: {
  correct: number;
  wrong: number;
  current: number;
  total: number;
  title: string;
}) {
  return (
    <header className="flex w-full items-center justify-between gap-4">
      {/* Left */}
      <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>

      {/* Right */}

      <span className="text-neutral-600">
        {current} / {total}
      </span>
    </header>
  );
}

function FlashcardDeckControls({
  previousDisabled,
  onPrevious,
  onWrong,
  onCorrect,
  onRestart,
}: {
  previousDisabled: boolean;
  onPrevious: () => void;
  onWrong: () => void;
  onCorrect: () => void;
  onRestart: () => void;
}) {
  const button =
    'inline-flex mt-7 items-center gap-3 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50';
  const buttonDisabled = `${button} disabled:cursor-not-allowed disabled:opacity-50`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        disabled={previousDisabled}
        className={buttonDisabled}
      >
        <Undo2 size={18} />
        <span>Previous</span>
      </button>

      <button type="button" onClick={onWrong} className={button}>
        <LucideX size={18} />
        <span>Wrong</span>
      </button>

      <button type="button" onClick={onCorrect} className={button}>
        <LucideCheck size={18} />
        <span>Correct</span>
      </button>

      <button type="button" onClick={onRestart} className={button}>
        <RotateCcw size={18} />
        <span>Restart</span>
      </button>
    </div>
  );
}

export default function FlashcardDeck({
  correct,
  wrong,
  current,
  total,
  word,
  flip,
  title,
  previousDisabled,
  onPrevious,
  onWrong,
  onCorrect,
  onRestart,
}: {
  correct: number;
  wrong: number;
  current: number;
  title: string;
  total: number;
  word: IWord;
  flip: FlipDirection;
  previousDisabled: boolean;
  onPrevious: () => void;
  onWrong: () => void;
  onCorrect: () => void;
  onRestart: () => void;
}) {
  return (
    <section className="flex w-1/2 flex-col items-center gap-6">
      <FlashcardDeckHeader
        correct={correct}
        wrong={wrong}
        current={current}
        total={total}
        title={title}
      />
      <WordCard key={word.id} word={word} flip={flip} />
      <FlashcardDeckControls
        previousDisabled={previousDisabled}
        onPrevious={onPrevious}
        onWrong={onWrong}
        onCorrect={onCorrect}
        onRestart={onRestart}
      />
    </section>
  );
}
