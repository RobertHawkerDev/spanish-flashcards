import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { words } from '@/app/data/words';
import companyName from '@/app/utils/company-name';

import DeckClient from './deck-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const collection = words.find(word => word.slug === slug);

  if (!collection) {
    return {
      title: 'Deck Not Found',
      description: `The vocabulary deck you're looking for doesn't exist or may have been removed. Browse available ${companyName} decks.`,
    };
  }

  return { title: collection.name, description: collection.description };
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = words.find(word => word.slug === slug);

  if (!collection) return notFound();

  return (
    <main className="px-6">
      <DeckClient title={collection.name} words={collection.words} />
    </main>
  );
}
