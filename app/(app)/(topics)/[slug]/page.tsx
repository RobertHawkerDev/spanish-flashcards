import { ArrowRight, Layers, ListChecks } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { topics } from '@/app/data/topics/index';
import companyName from '@/app/utils/company-name';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const collection = topics.find(topic => topic.slug === slug);

  if (!collection) {
    return {
      title: 'topic Not Found',
      description: `The vocabulary topic you're looking for doesn't exist or may have been removed. Browse available ${companyName} topics.`,
    };
  }

  return {
    title: collection.seo_title,
    description: collection.seo_description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = topics.find(topic => topic.slug === slug);
  if (!collection) return notFound();

  return (
    <main className="flex flex-1 flex-col bg-neutral-100 px-5 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {/* Hero */}
        <header className="flex flex-col items-center text-center">
          <div className="relative mb-3 size-24 sm:size-28">
            <Image
              fill
              src={collection.icon_svg}
              alt={`${collection.name} icon`}
              className="pointer-events-none select-none"
              draggable={false}
              priority
            />
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {collection.name}
          </h1>

          <p className="mt-2 text-sm font-semibold text-neutral-600">
            {collection.word_count} words
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed font-medium text-neutral-700">
            {collection.seo_description}
          </p>

          <p className="mt-3 max-w-3xl text-sm font-medium text-neutral-600">
            Pick a mode below — use{' '}
            <span className="font-semibold">Flashcards</span> to practice
            actively, or browse the{' '}
            <span className="font-semibold">Words List</span> to review
            everything at a glance.
          </p>
        </header>

        {/* Options */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Flashcards */}
          <Link
            href={`/${collection.slug}/flashcards`}
            className="group rounded-xl"
          >
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
                      Practice with quick flips and repetition — great for
                      memorising fast.
                    </p>
                  </div>
                </div>

                <ArrowRight className="mt-1 size-5 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-neutral-700" />
              </div>

              <ul className="mt-5 space-y-2 text-sm font-medium text-neutral-700">
                <li>• Learn by recall (stronger memory than reading)</li>
                <li>• Track your progress as you work through the topic</li>
                <li>• Best when you have 3–10 minutes spare</li>
              </ul>

              <div className="mt-6">
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-900 transition group-hover:bg-amber-500">
                  Learn with Flashcards
                </span>
              </div>
            </div>
          </Link>

          {/* Words list */}
          <Link href={`/${collection.slug}/words`} className="group rounded-xl">
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
                      Review every word with its translation — ideal before a
                      practice session.
                    </p>
                  </div>
                </div>

                <ArrowRight className="mt-1 size-5 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-neutral-700" />
              </div>

              <ul className="mt-5 space-y-2 text-sm font-medium text-neutral-700">
                <li>• Scan the full vocabulary set in one place</li>
                <li>• Helpful for quick refreshers and spotting gaps</li>
                <li>• Perfect if you prefer reading first</li>
              </ul>

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
