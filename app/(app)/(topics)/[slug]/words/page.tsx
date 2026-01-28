import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { topics } from '@/app/data/topics/index';
import companyName from '@/app/utils/company-name';

import WordCard from './word-card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const topic = topics.find(topic => topic.slug === slug);

  if (!topic) {
    return {
      title: 'Words List Not Found',
      description: `The topic you are looking for does not exist or may have been removed. Return home and browse available topics on ${companyName}.`,
    };
  }

  return {
    title: `Spanish ${topic.name} Vocabulary with Pictures and Audio`,
    description: `View all vocabulary words in the ${topic.name} topic before practicing them with our interactive flashcards.`,
  };
}

export default async function WordsListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const topic = topics.find(topic => topic.slug === slug);
  if (!topic) return notFound();

  const ctaClasses = [
    'inline-flex items-center justify-center rounded-full bg-amber-400',
    'px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-500',
    'transition active:scale-[0.99] hover:cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100',
    'dark:focus-visible:ring-offset-neutral-950',
  ].join(' ');

  return (
    <main
      className={[
        'flex flex-1 flex-col py-6',
        // keeps the bottom CTA safe from the footer on iOS + small screens
        'pb-[calc(env(safe-area-inset-bottom)+7rem)]',
      ].join(' ')}
    >
      {/* Center the content like your screenshots */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 lg:max-w-4xl">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl dark:text-neutral-50">
              {topic.name} Words
            </h1>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              {topic.word_count} words • Tap the speaker to hear pronunciation
            </p>
          </div>

          <Link
            href={`/${topic.slug}/flashcards`}
            className={[
              ctaClasses,
              // mobile: full width under title; sm+: pill on the right
              'w-full sm:w-fit',
            ].join(' ')}
          >
            Learn with Flashcards
          </Link>
        </div>

        {/* List card */}
        <div
          className={[
            'w-full overflow-hidden rounded-xl border bg-white',
            // Light: small, darker shadow (your preference)
            'border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.12)]',
            // Dark: match your dark card tone
            'dark:border-neutral-700 dark:bg-neutral-800/70 dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]',
          ].join(' ')}
        >
          {topic.words.map((word, index) => {
            const isLast = index === topic.words.length - 1;
            return <WordCard key={word.id} isLast={isLast} word={word} />;
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center pt-2">
          <Link
            className={[
              ctaClasses,
              // keep your existing sizing, just ensure it behaves on small screens
              'w-full max-w-96 sm:w-auto sm:min-w-52',
              'px-6 py-4',
            ].join(' ')}
            href={`/${topic.slug}/flashcards`}
          >
            Learn with Flashcards
          </Link>
        </div>
      </div>
    </main>
  );
}
