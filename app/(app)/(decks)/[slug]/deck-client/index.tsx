'use client';

import { useMemo, useState } from 'react';

import type IWord from '@/app/interface/word';

import WordCard from '../word-card';

type FlipDirection = 'horizontal' | 'vertical';
type Answer = 'correct' | 'wrong';

type HistoryAction = {
  prevIndex: number;
  nextIndex: number;
  wordId: string;
  prevAnswer?: Answer;
  newAnswer: Answer;
  wasNewAnswer: boolean;
};

export default function DeckClient({
  words,
  flip = 'horizontal',
}: {
  words: IWord[];
  flip?: FlipDirection;
}) {
  const total = words.length;

  const [index, setIndex] = useState(0);
  const [answersById, setAnswersById] = useState<Record<string, Answer>>({});
  const [history, setHistory] = useState<HistoryAction[]>([]);
  const [hasUsedPrevious, setHasUsedPrevious] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const safeIndex = total === 0 ? 0 : Math.min(index, total - 1);
  const currentWord = useMemo(() => words[safeIndex], [words, safeIndex]);

  const tally = useMemo(() => {
    let correct = 0;
    let wrong = 0;

    for (const v of Object.values(answersById)) {
      if (v === 'correct') correct += 1;
      if (v === 'wrong') wrong += 1;
    }

    return { correct, wrong };
  }, [answersById]);

  const isFinished = total > 0 && answeredCount >= total;

  const percentage =
    total === 0 ? 0 : Math.round((tally.correct / total) * 100);

  const feedback = useMemo(() => {
    if (percentage === 100) {
      return { title: 'Perfect!', message: '100% — you smashed it. 🔥' };
    }
    if (percentage >= 90) {
      return { title: 'Excellent!', message: '90%+ — seriously strong. 💪' };
    }
    if (percentage >= 75) {
      return {
        title: 'Great job!',
        message: 'You’re getting really solid now. Keep going. ✅',
      };
    }
    if (percentage >= 50) {
      return {
        title: 'Good progress',
        message: 'Nice — a bit more repetition and you’ll lock it in. 👍',
      };
    }
    return {
      title: 'Let’s warm up',
      message: 'Totally fine — restart and you’ll improve fast. 🚀',
    };
  }, [percentage]);

  function grade(answer: Answer) {
    if (!currentWord || total === 0 || isFinished) return;

    const wordId = String(currentWord.id);
    const previousAnswer = answersById[wordId];
    const wasNewAnswer = previousAnswer === undefined;

    const previousIndex = safeIndex;
    const nextIndex = Math.min(total - 1, safeIndex + 1);

    setHistory(previous_ => [
      ...previous_,
      {
        prevIndex: previousIndex,
        nextIndex,
        wordId,
        prevAnswer: previousAnswer,
        newAnswer: answer,
        wasNewAnswer,
      },
    ]);

    setAnswersById(previous_ => ({ ...previous_, [wordId]: answer }));

    if (wasNewAnswer) setAnsweredCount(c => c + 1);

    setIndex(nextIndex);
    setHasUsedPrevious(false);
  }

  function previous() {
    if (hasUsedPrevious) return;
    if (safeIndex === 0) return;
    if (history.length === 0) return;

    const last = history.at(-1);

    if (!last) return;

    setIndex(last.prevIndex);

    setAnswersById(previous_ => {
      const next = { ...previous_ };
      if (last.prevAnswer === undefined) delete next[last.wordId];
      else next[last.wordId] = last.prevAnswer;
      return next;
    });

    if (last.wasNewAnswer) setAnsweredCount(c => Math.max(0, c - 1));

    setHistory(previous_ => previous_.slice(0, -1));
    setHasUsedPrevious(true);
  }

  function restart() {
    setIndex(0);
    setAnswersById({});
    setHistory([]);
    setHasUsedPrevious(false);
    setAnsweredCount(0);
  }

  const previousDisabled =
    isFinished || safeIndex === 0 || history.length === 0 || hasUsedPrevious;

  let content: React.ReactNode;

  if (total === 0) {
    content = (
      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-bold">No words in this deck</h2>
        <p className="text-sm text-neutral-600">
          Add some words to start studying.
        </p>
      </section>
    );
  } else if (isFinished) {
    content = (
      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-xl border bg-white p-6">
        <h2 className="text-2xl font-bold">Results</h2>

        <div className="text-center">
          <p className="text-lg font-semibold">{feedback.title}</p>
          <p className="mt-1 text-sm text-neutral-600">{feedback.message}</p>
        </div>

        <div className="flex w-full flex-col gap-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border bg-neutral-50 px-4 py-3">
            <span>✅ Correct</span>
            <span className="font-semibold">{tally.correct}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border bg-neutral-50 px-4 py-3">
            <span>❌ Wrong</span>
            <span className="font-semibold">{tally.wrong}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border bg-neutral-50 px-4 py-3">
            <span>📈 Score</span>
            <span className="font-semibold">{percentage}%</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowRestartModal(true)}
          className="mt-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Restart
        </button>
      </section>
    );
  } else {
    content = (
      <section className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 text-sm">
          <div className="rounded-full border bg-white px-3 py-1">
            ✅ Correct: <span className="font-semibold">{tally.correct}</span>
          </div>
          <div className="rounded-full border bg-white px-3 py-1">
            ❌ Wrong: <span className="font-semibold">{tally.wrong}</span>
          </div>
          <div className="text-neutral-600">
            Card {safeIndex + 1} / {total}
          </div>
        </div>

        <WordCard key={currentWord.id} word={currentWord} flip={flip} />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={previous}
            disabled={previousDisabled}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => grade('wrong')}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Wrong
          </button>

          <button
            type="button"
            onClick={() => grade('correct')}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Correct
          </button>

          <button
            type="button"
            onClick={() => setShowRestartModal(true)}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Restart
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {content}

      {showRestartModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="restart-title"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowRestartModal(false)}
          />

          <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
            <h3 id="restart-title" className="text-lg font-semibold">
              Restart deck?
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              This will reset your progress and clear your results.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRestartModal(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  restart();
                  setShowRestartModal(false);
                }}
                className="rounded-lg border bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
