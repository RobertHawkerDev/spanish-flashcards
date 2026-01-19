'use client';

import type IWord from '@/app/interface/word';

import FlashcardDeck from './flashcard-deck';
import { useFlashcardDeck } from './hooks/use-flashcard-deck';
import ResultsPanel from './results-panel';

export default function DeckClient({
  words,
  title,
}: {
  words: IWord[];
  title: string;
}) {
  const deck = useFlashcardDeck(words);

  return (
    <>
      {deck.isFinished ? (
        <ResultsPanel
          correct={deck.tally.correct}
          wrong={deck.tally.wrong}
          percentage={deck.percentage}
          feedback={deck.feedback}
          onRestart={deck.actions.restart}
        />
      ) : (
        <FlashcardDeck
          title={title}
          current={deck.current}
          total={deck.total}
          word={deck.currentWord}
          onWrong={deck.actions.wrong}
          onCorrect={deck.actions.correct}
        />
      )}
    </>
  );
}
