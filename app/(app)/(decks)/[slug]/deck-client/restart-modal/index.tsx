export default function RestartModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="restart-title"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h3 id="restart-title" className="text-lg font-semibold">
          Restart deck?
        </h3>

        <p className="mt-2 text-sm text-neutral-600">
          This will reset your progress and clear your results.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg border bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
