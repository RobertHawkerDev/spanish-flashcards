'use client';

import { useMemo, useState } from 'react';

import type IWord from '@/app/interfaces/word';

export type Answer = 'correct' | 'wrong';

type HistoryAction = {
  prevIndex: number;
  nextIndex: number;
  wordId: string;
  prevAnswer?: Answer;
  newAnswer: Answer;
  wasNewAnswer: boolean;
};

export type Feedback = { title: string; message: string };

function getFeedback(percentage: number): Feedback {
  if (percentage === 100) {
    return {
      title: 'Outstanding',
      message: 'Perfect score. You demonstrated complete mastery of this set.',
    };
  }

  if (percentage >= 90) {
    return {
      title: 'Excellent',
      message: 'Very strong result. You clearly understand this vocabulary.',
    };
  }

  if (percentage >= 75) {
    return {
      title: 'Well done',
      message:
        'Good progress overall. A little more practice will help reinforce accuracy.',
    };
  }

  if (percentage >= 50) {
    return {
      title: 'Good progress',
      message:
        'You are on the right track. Review the incorrect words and try again.',
    };
  }

  return {
    title: 'Keep practicing',
    message:
      'This set needs more review. Repeating the deck will help build confidence.',
  };
}

export function useFlashcardDeck(words: IWord[]) {
  const total = words.length;

  const [index, setIndex] = useState(0);
  const [answersById, setAnswersById] = useState<Record<string, Answer>>({});
  const [history, setHistory] = useState<HistoryAction[]>([]);
  const [hasUsedPrevious, setHasUsedPrevious] = useState(false);
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

  const percentage = useMemo(() => {
    if (total === 0) return 0;
    return Math.round((tally.correct / total) * 100);
  }, [tally.correct, total]);

  const feedback = useMemo(() => getFeedback(percentage), [percentage]);

  const previousDisabled = useMemo(() => {
    return (
      isFinished || safeIndex === 0 || history.length === 0 || hasUsedPrevious
    );
  }, [isFinished, safeIndex, history.length, hasUsedPrevious]);

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

  return {
    // view/state
    total,
    isEmpty: total === 0,
    isFinished,

    // progress
    current: safeIndex + 1,
    index: safeIndex,

    // content
    currentWord,

    // scoring
    tally,
    percentage,
    feedback,

    // controls
    previousDisabled,
    actions: {
      wrong: () => grade('wrong'),
      correct: () => grade('correct'),
      previous,
      restart,
    },
  };
}
