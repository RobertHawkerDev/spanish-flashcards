import { ArrowRight, Layers, ListChecks } from 'lucide-react';
import { Metadata } from 'next';
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

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const topic = topics.find(topic => topic.slug === slug);
  if (!topic) return notFound();

  return (
    <main className="flex flex-1 flex-col bg-neutral-100 px-5 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white p-8">
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
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            {topic.name}
          </h1>

          <p className="mt-2 text-sm font-semibold text-neutral-600">
            {topic.word_count} words
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed font-medium text-neutral-700">
            {topic.description}
          </p>
        </div>

        {/* Options */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Flashcards */}
          <Link href={`/${topic.slug}/flashcards`} className="group rounded-xl">
            <div className="h-full rounded-xl border border-neutral-200 bg-white p-7 shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(0,0,0,0.14)]">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-neutral-900">
                    <Layers className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900">
                      Flashcards
                    </h2>
                    <p className="mt-1 text-sm font-medium text-neutral-600">
                      Memorize and learn words in the {topic.name.toLowerCase()}{' '}
                      topic with our fun and interactive flashcards. Includes
                      translations, pictures and audio.
                    </p>
                  </div>
                </div>

                <ArrowRight className="mt-1 size-5 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-neutral-700" />
              </div>

              <div className="mt-6">
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-900 transition group-hover:bg-amber-500">
                  Learn with Flashcards
                </span>
              </div>
            </div>
          </Link>

          {/* Words list */}
          <Link href={`/${topic.slug}/words`} className="group rounded-xl">
            <div className="h-full rounded-xl border border-neutral-200 bg-white p-7 shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(0,0,0,0.14)]">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-neutral-900">
                    <ListChecks className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900">
                      Words List
                    </h2>
                    <p className="mt-1 text-sm font-medium text-neutral-600">
                      Browse a complete list of words in the{' '}
                      {topic.name.toLowerCase()} topic. Learn with clear
                      translations, pictures, and audio to support effective
                      language learning.
                    </p>
                  </div>
                </div>

                <ArrowRight className="mt-1 size-5 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-neutral-700" />
              </div>

              <div className="mt-6">
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-900 transition group-hover:bg-amber-500">
                  Study Words
                </span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
