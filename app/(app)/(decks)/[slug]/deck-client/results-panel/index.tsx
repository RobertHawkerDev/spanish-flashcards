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
    <section className="mx-auto mt-10 flex w-full max-w-3xl flex-col items-center gap-6 rounded-xl border border-neutral-400 bg-white p-9">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{percentage}%</h2>
        <p className="mt-3 text-base text-neutral-600">{feedback.message}</p>
      </div>

      <div className="mt-4 flex w-full flex-row gap-4 text-sm">
        <div className="flex flex-1 flex-col items-center justify-between rounded-lg border-2 bg-neutral-100 px-4 py-5">
          <span className="text-lg font-semibold">Correct</span>
          <span className="mt-3 text-3xl font-semibold">{correct}</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-between rounded-lg border-2 bg-neutral-100 px-4 py-5">
          <span className="text-lg font-semibold">Incorrect</span>
          <span className="mt-3 text-3xl font-semibold">{wrong}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-3 flex min-w-48 items-center justify-center gap-2 rounded-full border bg-black px-4 py-4 text-sm font-semibold text-white hover:cursor-pointer hover:bg-neutral-700"
      >
        <RotateCcw size={20} />
        <span className="text-base">Restart</span>
      </button>
    </section>
  );
}
