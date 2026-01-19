'use client';

import type IWord from '@/app/interface/word';

import FlashcardDeck from './flashcard-deck';
import {
  type FlipDirection,
  useFlashcardDeck,
} from './hooks/use-flashcard-deck';
import RestartModal from './restart-modal';
import ResultsPanel from './results-panel';

export default function DeckClient({
  words,
  title,
  flip = 'horizontal',
}: {
  words: IWord[];
  title: string;
  flip?: FlipDirection;
}) {
  const deck = useFlashcardDeck(words);

  if (deck.isEmpty) return <p>No words in this deck.</p>;

  return (
    <>
      {deck.isFinished ? (
        <ResultsPanel
          correct={deck.tally.correct}
          wrong={deck.tally.wrong}
          percentage={deck.percentage}
          feedback={deck.feedback}
          onRestart={deck.actions.openRestartModal}
        />
      ) : (
        <FlashcardDeck
          title={title}
          correct={deck.tally.correct}
          wrong={deck.tally.wrong}
          current={deck.current}
          total={deck.total}
          word={deck.currentWord}
          flip={flip}
          previousDisabled={deck.previousDisabled}
          onPrevious={deck.actions.previous}
          onWrong={deck.actions.wrong}
          onCorrect={deck.actions.correct}
          onRestart={deck.actions.openRestartModal}
        />
      )}

      <RestartModal
        open={deck.restartModalOpen}
        onCancel={deck.actions.closeRestartModal}
        onConfirm={deck.actions.confirmRestart}
      />
    </>
  );
}
