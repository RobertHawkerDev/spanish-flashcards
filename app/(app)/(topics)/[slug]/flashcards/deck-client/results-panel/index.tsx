import { RotateCcw } from 'lucide-react';

export default function ResultsPanel({
  correct,
  wrong,
  percentage,
  feedback,
  onRestart,
}: {
  correct: number;
  wrong: number;
  percentage: number;
  feedback: { title: string; message: string };
  onRestart: () => void;
}) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-2 lg:max-w-4xl">
      <div
        className={[
          'w-full rounded-xl border bg-white p-8 sm:p-10',
          'border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
          'dark:border-neutral-700 dark:bg-neutral-800/70 dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
        ].join(' ')}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
            {percentage}%
          </h2>
          <p className="mt-3 text-base font-medium text-neutral-700 dark:text-neutral-300">
            {feedback.message}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-700 dark:bg-neutral-900/20">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Correct
            </p>
            <p className="mt-2 text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {correct}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-700 dark:bg-neutral-900/20">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Incorrect
            </p>
            <p className="mt-2 text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {wrong}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-w-52 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-4 font-semibold text-neutral-900 hover:cursor-pointer hover:bg-amber-500 active:scale-[0.99]"
          >
            <RotateCcw size={20} />
            <span className="text-base">Restart</span>
          </button>
        </div>
      </div>
    </section>
  );
}
