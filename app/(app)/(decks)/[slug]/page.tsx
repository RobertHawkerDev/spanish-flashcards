import { Metadata } from 'next';

import { words } from '@/app/data/words';
import companyName from '@/app/utils/company-name';

import WordCard from './components/word-card';

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

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = words.find(word => word.slug === slug);

  if (!collection) {
    return <p>No Colelction</p>;
  }

  return (
    <main className="px-10 py-10">
      <div>
        <h1 className="text-2xl font-bold">{collection.name}</h1>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-10">
        {collection.words.map(word => {
          return <WordCard key={word.id} word={word} />;
        })}
      </div>
    </main>
  );
}
