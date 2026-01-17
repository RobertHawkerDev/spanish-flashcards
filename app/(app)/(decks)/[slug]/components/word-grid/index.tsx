'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import WordCard from '../word-card';

type MarkResult = 'correct' | 'wrong';

type Word = {
  id: string | number;
  icon_svg: string;
  english: string;
  spanish_article: string;
  spanish: string;
};

type Columns = 1 | 2 | 3 | 4;

function compactTail(cols: Word[][]) {
  const next = cols.map(c => [...c]);

  const minLength = Math.min(...next.map(c => c.length));
  const heads = next.map(c => c.slice(0, minLength));

  const tail: Word[] = [];
  for (let c = 0; c < next.length; c++) tail.push(...next[c].slice(minLength));

  for (const [index, element] of tail.entries()) {
    heads[index % next.length].push(element);
  }

  return heads;
}

function flattenRowMajor(cols: Word[][]) {
  const maxLength = Math.max(...cols.map(c => c.length), 0);
  const out: Word[] = [];

  for (let r = 0; r < maxLength; r++) {
    for (const col of cols) {
      const item = col[r];
      if (item) out.push(item);
    }
  }

  return out;
}

function toColumns(items: Word[], columns: number) {
  const cols: Word[][] = Array.from({ length: columns }, () => []);
  for (const [index, w] of items.entries()) cols[index % columns].push(w);
  return compactTail(cols);
}

function colsForWidth(width: number): Columns {
  if (width >= 1200) return 4;
  if (width >= 900) return 3;
  if (width >= 600) return 2;
  return 1;
}

function removeFromCurrentColumn(cols: Word[][], id: string) {
  const colIndex = cols.findIndex(col => col.some(w => String(w.id) === id));
  if (colIndex === -1) return cols;

  const next = cols.map(col => [...col]);
  next[colIndex] = next[colIndex].filter(w => String(w.id) !== id);

  return compactTail(next);
}

function rebuildForColumns(cols: Word[][], nextCols: Columns) {
  const items = flattenRowMajor(cols);
  return toColumns(items, nextCols);
}

export default function CollectionGrid({
  words,
  columns: initialColumns = 4,
  onMark,
  onComplete,
}: {
  words: Word[];
  columns?: Columns;
  onMark?: (result: MarkResult) => void;
  onComplete?: () => void;
}) {
  const containerReference = useRef<HTMLDivElement | null>(null);

  const initialColWords = useMemo(() => {
    return toColumns(words, initialColumns);
  }, [words, initialColumns]);

  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [colWords, setColWords] = useState<Word[][]>(initialColWords);

  // Auto-animate hooks (max 4)
  const [col0] = useAutoAnimate<HTMLDivElement>({
    duration: 220,
    easing: 'ease-in-out',
  });
  const [col1] = useAutoAnimate<HTMLDivElement>({
    duration: 220,
    easing: 'ease-in-out',
  });
  const [col2] = useAutoAnimate<HTMLDivElement>({
    duration: 220,
    easing: 'ease-in-out',
  });
  const [col3] = useAutoAnimate<HTMLDivElement>({
    duration: 220,
    easing: 'ease-in-out',
  });
  const columnReferences = [col0, col1, col2, col3];

  // Keep columns state in sync with container width, and rebuild layout when it changes
  useEffect(() => {
    const element = containerReference.current;
    if (!element) return;

    const handleResize = (width: number) => {
      const nextCols = colsForWidth(width);

      // Avoid nested setters: compute from current values
      setColumns(previousCols => {
        if (previousCols === nextCols) return previousCols;
        return nextCols;
      });

      // Rebuild colWords only when needed, based on current layout
      setColWords(previousColsWords => {
        // derive current columns from width too, and compare against current "columns" via closure-safe approach:
        // we rebuild every time handleResize is called *only if* nextCols differs from the column count implied by render.
        // Since columns state updates async, we can just rebuild when nextCols differs from prev length slice target.
        const currentCols = Math.min(previousColsWords.length, 4) as Columns;
        if (currentCols === nextCols) return previousColsWords;
        return rebuildForColumns(previousColsWords, nextCols);
      });
    };

    const ro = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect?.width ?? 0;
      handleResize(width);
    });

    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  const handleMark = (id: Word['id'], result: MarkResult) => {
    const key = String(id);

    onMark?.(result);

    setColWords(previous => {
      const next = removeFromCurrentColumn(previous, key);

      // if no cards left, tell parent (after state updates)
      const remaining = next.reduce(
        (accumulator, col) => accumulator + col.length,
        0,
      );
      if (remaining === 0) {
        // queue after render to avoid setState during render warnings
        queueMicrotask(() => onComplete?.());
      }

      return next;
    });
  };

  return (
    <div ref={containerReference} className="mt-10">
      <div className="flex gap-10">
        {colWords.slice(0, columns).map((col, index) => (
          <div
            key={index}
            ref={columnReferences[index]}
            className="flex flex-1 flex-col gap-10"
          >
            {col.map(word => (
              <WordCard
                key={word.id}
                word={word}
                onMark={result => handleMark(word.id, result)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
