import Image from 'next/image';
import Link from 'next/link';

import Itopic from '@/app/interfaces/topic';

export default function TopicLink({ topic }: { topic: Itopic }) {
  return (
    <Link
      href={`/${topic.slug}`}
      className="block h-full rounded-lg focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:focus-visible:ring-offset-neutral-950"
    >
      <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-lg border border-neutral-300 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition hover:-translate-y-px hover:cursor-pointer hover:shadow-[0_6px_18px_rgba(0,0,0,0.14)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:ring-1 dark:shadow-black/50 dark:ring-white/5">
        <div className="flex flex-col items-center p-4 md:p-6">
          <div className="relative size-20 md:size-24">
            <Image
              className="pointer-events-none select-none"
              draggable={false}
              fill
              alt={`${topic.name} icon`}
              src={topic.icon_svg}
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="mt-4 text-center text-base font-semibold text-neutral-900 md:text-lg dark:text-neutral-100">
              {topic.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-neutral-700 md:text-base dark:text-neutral-400">
              {topic.word_count} words
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
