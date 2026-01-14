import { Metadata } from 'next';

import { fruitAndVegetables } from '@/app/data/fruit-and-vegetables';

import WordCard from './components/word-card';

export function generateMetadata(): Metadata {
  return { title: 'Deck' };
}

export default async function CollectionPage() {
  return (
    <main className="px-10 py-10">
      <div>
        <h1 className="text-2xl font-bold">Fruit and Vegetables</h1>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-10">
        {fruitAndVegetables.words.map(word => {
          return <WordCard key={word.id} word={word} />;
        })}
      </div>
    </main>
  );
}
