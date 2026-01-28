import { Metadata } from 'next';
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

  const topic = topics.find(topic => topic.slug === slug);

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

  const topic = topics.find(topic => topic.slug === slug);

  if (!topic) return notFound();

  return (
    <main className="flex flex-1 flex-col bg-neutral-100 py-4">
      <div className="w-full">
        <DeckClient title={topic.name} slug={slug} words={topic.words} />
      </div>
    </main>
  );
}
