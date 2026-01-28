// 👇 add this import (Node runtime)
import crypto from 'node:crypto';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { topics } from '@/app/data/topics/index';
import companyName from '@/app/utils/company-name';

import DeckClient from './deck-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = topics.find(t => t.slug === slug);

  if (!topic) {
    return {
      title: 'Flashcards Not Found',
      description: `The topic you are looking for does not exist or may have been removed. Return home and browse available topics on ${companyName}.`,
    };
  }

  return {
    title: `Spanish ${topic.name} Vocabulary Flashcards with Pictures`,
    description: `Memorize and learn words in the ${topic.name.toLowerCase()} topic with our fun and interactive flashcards. Includes translations, pictures and audio.`,
  };
}

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const topic = topics.find(t => t.slug === slug);
  if (!topic) return notFound();

  // ✅ new value on every full reload, but consistent for SSR + hydration
  const seedBase = crypto.randomUUID();

  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+7rem)] sm:px-6 sm:pt-6 md:pt-8">
      <div className="mx-auto w-full max-w-4xl">
        <DeckClient
          title={topic.name}
          slug={slug}
          words={topic.words}
          seedBase={seedBase}
        />
      </div>
    </main>
  );
}
