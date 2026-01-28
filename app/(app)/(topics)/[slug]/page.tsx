import { ArrowRight, Layers, ListChecks } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { topics } from '@/app/data/topics';
import companyName from '@/app/utils/company-name';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const topic = topics.find(topic => topic.slug === slug);

  if (!topic) {
    return {
      title: 'Topic Not Found',
      description: `The topic you are looking for does not exist or may have been removed. Return home and browse available topics on ${companyName}.`,
    };
  }

  return {
    title: `Learn ${topic.name} Vocabulary in Spanish`,
    description: topic.description,
  };
}

function OptionCard({
  href,
  icon,
  title,
  description,
  cta,
  mobileDescription,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  mobileDescription: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className={[
        'group block rounded-2xl', // ✅ no h-full on mobile
        'focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:outline-none',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        'dark:focus-visible:ring-offset-neutral-950',
      ].join(' ')}
    >
      <div
        className={[
          // ✅ natural height on mobile, full height only from md+
          'rounded-2xl border p-6 transition sm:p-7 md:flex md:h-full md:flex-col',
          'border-neutral-200 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
          'hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(0,0,0,0.14)]',
          'dark:border-neutral-700 dark:bg-neutral-800/70 dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
          'dark:hover:bg-neutral-800/80',
          'hover:cursor-pointer',
        ].join(' ')}
      >
        {/* ✅ don’t let this be flex-1 on mobile (that’s what “grows”) */}
        <div className="flex items-start gap-4 md:flex-1">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-neutral-900"
            aria-hidden="true"
          >
            {icon}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {title}
            </h2>

            <p className="mt-1 text-sm leading-relaxed font-medium text-neutral-600 dark:text-neutral-300">
              <span className="sm:hidden">{mobileDescription}</span>
              <span className="hidden sm:inline">{description}</span>
            </p>

            {/* ✅ optional: pin CTA to bottom on md+ only */}
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 md:mt-auto dark:text-amber-400">
              {cta}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const topic = topics.find(topic => topic.slug === slug);
  if (!topic) return notFound();

  return (
    <main
      className={[
        'flex flex-1 flex-col px-5 pt-10',
        'pb-[calc(env(safe-area-inset-bottom)+7rem)]',
        'md:py-10',
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 size-24">
            <Image
              fill
              src={topic.icon_svg}
              alt={`${topic.name} icon`}
              className="pointer-events-none select-none"
              draggable={false}
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-neutral-50">
            {topic.name}
          </h1>

          <p className="mt-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
            {topic.word_count} words
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed font-medium text-neutral-700 dark:text-neutral-200">
            <span className="sm:hidden">
              Learn essential Spanish {topic.name.toLowerCase()} vocabulary with
              flashcards and a word list.
            </span>
            <span className="hidden sm:inline">{topic.description}</span>
          </p>
        </div>

        {/* Options */}
        <section className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          <OptionCard
            href={`/${topic.slug}/flashcards`}
            icon={<Layers className="size-5" />}
            title="Flashcards"
            mobileDescription="Learn with visual flashcards and audio."
            description={`Practice the ${topic.name.toLowerCase()} vocabulary with interactive flashcards, pictures, and audio pronunciation.`}
            cta="Start learning"
          />

          <OptionCard
            href={`/${topic.slug}/words`}
            icon={<ListChecks className="size-5" />}
            title="Words List"
            mobileDescription="Browse every word with pictures and audio."
            description={`Browse every word in the ${topic.name.toLowerCase()} topic with clear translations, images, and audio.`}
            cta="View word list"
          />
        </section>
      </div>
    </main>
  );
}
