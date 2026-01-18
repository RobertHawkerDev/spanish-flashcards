import { Metadata } from 'next';

import { words } from '@/app/data/words';
import companyName from '@/app/utils/company-name';

import WordCard from './word-card';

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

  if (!collection) return <p>No Collection</p>;

  return (
    <main className="flex flex-1 flex-col bg-neutral-50 px-10">
      <h1>{collection.name}</h1>
      <div>
        {collection.words.map(word => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </main>
  );
}
