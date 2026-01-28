import { Metadata } from 'next';
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

  return (
    <main className="flex flex-1 flex-col py-6">
      {/* Center the content like your screenshots */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 lg:max-w-4xl">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl dark:text-neutral-50">
            {topic.name} Words
          </h1>

          <Link
            href={`/${topic.slug}/flashcards`}
            className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-500"
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
        <div className="flex justify-center py-5">
          <Link
            className="flex max-w-96 min-w-52 items-center justify-center rounded-full bg-amber-400 px-6 py-4 text-center font-semibold text-neutral-900 hover:bg-amber-500"
            href={`/${topic.slug}/flashcards`}
          >
            Learn with Flashcards
          </Link>
        </div>
      </div>
    </main>
  );
}
