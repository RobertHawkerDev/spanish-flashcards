'use client';

import { track } from '@vercel/analytics';
import { useEffect, useMemo, useRef, useState } from 'react';

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

function DeckSession({
  words,
  title,
  slug,
  onPlayAgain,
}: {
  words: IWord[];
  title: string;
  slug: string;
  onPlayAgain: () => void;
}) {
  const maxFlippedReference = useRef(0);
  const firedBucketsReference = useRef(new Set<number>());
  const deckStartMsReference = useRef<number | null>(null);
  const hasTrackedTtfReference = useRef(false);

  const deck = useFlashcardDeck(words);

  // ✅ purity: performance.now() must not run during render
  // This runs once per mounted session (DeckSession remounts when key changes).
  useEffect(() => {
    maxFlippedReference.current = 0;
    firedBucketsReference.current = new Set<number>();
    deckStartMsReference.current = performance.now();
    hasTrackedTtfReference.current = false;
  }, []);

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

  return (
    <>
      {deck.isFinished ? (
        <ResultsPanel
          correct={deck.tally.correct}
          wrong={deck.tally.wrong}
          percentage={deck.percentage}
          feedback={deck.feedback}
          onRestart={onPlayAgain}
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

function hashStringToUint32(input: string): number {
  // FNV-1a 32-bit
  let hash = 0x81_1C_9D_C5;
  let index = 0;

  while (index < input.length) {
    const codePoint = input.codePointAt(index);
    if (codePoint === undefined) break;

    hash ^= codePoint;
    hash = Math.imul(hash, 0x01_00_01_93);

    // advance by 1 for BMP, 2 for surrogate pair
    index += codePoint > 0xFF_FF ? 2 : 1;
  }

  return hash >>> 0;
}

function mulberry32(seed: number) {
  let state = seed >>> 0;

  return function next(): number {
    state = Math.trunc(state + 0x6D_2B_79_F5);

    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t = Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function shuffleDeterministic(words: IWord[], seed: number): IWord[] {
  const result = [...words];
  const rand = mulberry32(seed);
  for (let index = result.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [result[index], result[index_]] = [result[index_], result[index]];
  }
  return result;
}

export default function DeckClient({
  words,
  title,
  slug,
  seedBase,
}: {
  words: IWord[];
  title: string;
  slug: string;
  seedBase: string; // ✅ server-generated per request
}) {
  const [sessionId, setSessionId] = useState(0);

  const sessionWords = useMemo(() => {
    // ✅ changes on reload because seedBase changes
    // ✅ changes on restart because sessionId changes
    const seed = hashStringToUint32(`${seedBase}:${slug}:${sessionId}`);
    return shuffleDeterministic(words, seed);
  }, [words, slug, seedBase, sessionId]);

  return (
    <DeckSession
      key={`${slug}:${sessionId}`}
      words={sessionWords}
      title={title}
      slug={slug}
      onPlayAgain={() => setSessionId(id => id + 1)}
    />
  );
}
