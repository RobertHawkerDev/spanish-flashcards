import { RotateCcw } from 'lucide-react';

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-neutral-50 px-4 py-3">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

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
    <section className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-xl border bg-white p-6">
      <h2 className="text-2xl font-bold">Results</h2>

      <div className="text-center">
        <p className="text-lg font-semibold">{feedback.title}</p>
        <p className="mt-1 text-sm text-neutral-600">{feedback.message}</p>
      </div>

      <div className="flex w-full flex-col gap-3 text-sm">
        <ResultRow label="✅ Correct" value={correct} />
        <ResultRow label="❌ Wrong" value={wrong} />
        <ResultRow label="📈 Score" value={`${percentage}%`} />
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-2 inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
      >
        <RotateCcw size={18} />
        Restart
      </button>
    </section>
  );
}
