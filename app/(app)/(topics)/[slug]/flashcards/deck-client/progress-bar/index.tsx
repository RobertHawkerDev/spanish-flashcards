import { useId } from 'react';

type ProgressBarProperties = {
  value?: number;
  current?: number;
  total?: number;
  label?: string;
  showCount?: boolean;
  className?: string;
  heightPx?: number;
};

const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

export default function ProgressBar({
  value,
  current,
  total,
  label = 'Progress',
  showCount = true,
  className = '',
  heightPx = 6,
}: ProgressBarProperties) {
  let computed = 0;

  if (typeof current === 'number' && typeof total === 'number' && total > 0) {
    computed = (current / total) * 100;
  } else if (typeof value === 'number') {
    computed = value;
  }

  const pct = clamp(computed);

  const labelId = useId();

  const hasName = Boolean(label); // if label is empty, fallback to aria-label below

  return (
    <div className={['w-full', className].join(' ')}>
      {(label || showCount) && (
        <div className="mb-2 flex items-center justify-between">
          {label ? (
            <span
              id={labelId}
              className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
            >
              {label}
            </span>
          ) : (
            <span />
          )}

          {showCount &&
          typeof current === 'number' &&
          typeof total === 'number' ? (
            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
              {current} / {total}
            </span>
          ) : undefined}
        </div>
      )}

      <div
        className="w-full rounded-full bg-neutral-200 dark:bg-neutral-700"
        style={{ height: heightPx }}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={hasName ? labelId : undefined}
        aria-label={hasName ? undefined : 'Progress'}
      >
        <div
          className="h-full rounded-full bg-amber-400 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
