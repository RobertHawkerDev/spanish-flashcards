import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { decks } from '@/app/data/decks/index';
import companyName from '@/app/utils/company-name';

import DeckClient from './deck-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const collection = decks.find(deck => deck.slug === slug);

  if (!collection) {
    return {
      title: 'Deck Not Found',
      description: `The vocabulary deck you're looking for doesn't exist or may have been removed. Browse available ${companyName} decks.`,
    };
  }

  return {
    title: collection.seo_title,
    description: collection.seo_description,
  };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = decks.find(deck => deck.slug === slug);

  if (!collection) return notFound();

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-neutral-100 py-4">
      <div className="w-full">
        <DeckClient
          title={collection.page_title}
          slug={slug}
          words={collection.words}
        />
      </div>
    </main>
  );
}
