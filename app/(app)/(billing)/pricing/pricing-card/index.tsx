type Properties = {
  variant: 'basic' | 'plus' | 'pro';
  title: string;
  pill?: string;
  recommended?: boolean;

  price: string;
  period: string;
  subText?: string[];

  description: string;
  bulletTitle?: string;

  cta: string;
};

export default function PricingCard({
  variant,
  title,
  pill,
  recommended,
  price,
  period,
  subText,
  description,
  bulletTitle,
  cta,
}: Properties) {
  const isPro = variant === 'pro';
  const isBasic = variant === 'basic';

  const wrapperClass =
    'relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md';

  const topBarClass =
    'flex items-center justify-between border-b border-black/10 px-5 py-3 ' +
    (isPro ? 'bg-[#f7d200]' : 'bg-transparent');

  const pillClass =
    'rounded-full border px-3 py-1 text-xs font-semibold ' +
    (isPro
      ? 'border-slate-900/30 text-slate-900'
      : 'border-slate-300 text-slate-700');

  const ctaClass =
    'mt-7 w-full rounded-full px-5 py-3 text-sm font-semibold ' +
    (isPro
      ? 'bg-[#3b2cff] text-white hover:brightness-110'
      : 'border-2 border-[#3b2cff] text-[#3b2cff] hover:bg-[#3b2cff]/5');

  return (
    <div className={wrapperClass}>
      {/* Top bar */}
      <div className={topBarClass}>
        <div className="flex items-center gap-2">
          {recommended ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white">
              <span aria-hidden>★</span>
              Recommended
            </span>
          ) : undefined}
        </div>

        {pill ? <span className={pillClass}>{pill}</span> : undefined}
      </div>

      {/* Body */}
      <div className="px-6 pt-5 pb-6">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>

        <div className="mt-6 text-center">
          <div className="flex items-end justify-center gap-1">
            <span className="text-6xl font-black tracking-tight">{price}</span>
            {isBasic ? undefined : (
              <span className="pb-2 text-sm font-semibold text-slate-700">
                {period}
              </span>
            )}
          </div>

          {isBasic ? (
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {period}
            </p>
          ) : (
            <div className="mt-3 space-y-1 text-sm text-slate-600">
              {(subText || []).map(t => (
                <p key={t}>{t}</p>
              ))}
            </div>
          )}
        </div>

        <p className="mx-auto mt-6 max-w-xs text-center text-sm text-slate-700">
          {description}
        </p>

        {/* “Everything in…” row */}
        {!isBasic && bulletTitle ? (
          <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-slate-800">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{bulletTitle}</span>
          </div>
        ) : undefined}

        {/* CTA */}
        <button className={ctaClass}>{cta}</button>
      </div>
    </div>
  );
}
