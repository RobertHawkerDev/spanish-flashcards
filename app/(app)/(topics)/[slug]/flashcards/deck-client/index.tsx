'use client';

import { track } from '@vercel/analytics';
import { useEffect, useRef } from 'react';

import type IWord from '@/app/interfaces/word';

import FlashcardDeck from './flashcard-deck';
import { useFlashcardDeck } from './hooks/use-flashcard-deck';
import ResultsPanel from './results-panel';

const BUCKETS = [5, 15, 30, 45, 60, 75] as const;

const bucketMs = (ms: number) => {
  if (ms < 1000) return '0-999';
  if (ms < 3000) return '1000-2999';
  if (ms < 7000) return '3000-6999';
  if (ms < 15_000) return '7000-14999';
  return '15000+';
};

export default function DeckClient({
  words,
  title,
  slug,
}: {
  words: IWord[];
  title: string;
  slug: string;
}) {
  const maxFlippedReference = useRef(0);
  const firedBucketsReference = useRef(new Set<number>());
  const deckStartMsReference = useRef<number | null>(null);
  const hasTrackedTtfReference = useRef(false);

  const deck = useFlashcardDeck(words);

  const handleFirstFlip = (cardIndex: number) => {
    if (
      !hasTrackedTtfReference.current &&
      deckStartMsReference.current !== null
    ) {
      const ms = Math.max(
        0,
        Math.round(performance.now() - deckStartMsReference.current),
      );
      track('time_to_first_flip', {
        deck_slug: slug,
        ms_bucket: bucketMs(ms),
      });
      hasTrackedTtfReference.current = true;
    }

    if (cardIndex <= maxFlippedReference.current) return;
    maxFlippedReference.current = cardIndex;

    for (const b of BUCKETS) {
      if (cardIndex >= b && !firedBucketsReference.current.has(b)) {
        track('cards_flipped_bucket', {
          deck_slug: slug,
          bucket: b,
        });
        firedBucketsReference.current.add(b);
      }
    }
  };

  useEffect(() => {
    maxFlippedReference.current = 0;
    firedBucketsReference.current = new Set<number>();
    deckStartMsReference.current = performance.now();
    hasTrackedTtfReference.current = false;
  }, [slug]);

  return (
    <>
      {deck.isFinished ? (
        <ResultsPanel
          correct={deck.tally.correct}
          wrong={deck.tally.wrong}
          percentage={deck.percentage}
          feedback={deck.feedback}
          onRestart={() => {
            maxFlippedReference.current = 0;
            firedBucketsReference.current = new Set<number>();

            deckStartMsReference.current = performance.now();
            hasTrackedTtfReference.current = false;

            deck.actions.restart();
          }}
        />
      ) : (
        <FlashcardDeck
          title={title}
          current={deck.current}
          total={deck.total}
          word={deck.currentWord}
          onWrong={deck.actions.wrong}
          onCorrect={deck.actions.correct}
          deckSlug={slug}
          onFirstFlip={handleFirstFlip}
        />
      )}
    </>
  );
}
