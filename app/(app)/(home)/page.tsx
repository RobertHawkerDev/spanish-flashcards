import { decks } from '../../data/decks';
import DeckLink from './components/deck-link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-neutral-100 p-4 px-6 sm:p-10 sm:py-8">
      <div className="flex-1 pb-20">
        <h1 className="mt-2 text-lg font-bold sm:mt-0 sm:text-2xl">
          Pick a deck and start learning Spanish
        </h1>
        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-neutral-300 sm:mt-10 sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:border-none md:grid-cols-3 lg:grid-cols-4">
          {decks.map((deck, index) => {
            const isLast = index === decks.length - 1;
            return <DeckLink key={deck.id} deck={deck} isLast={isLast} />;
          })}
        </div>
      </div>
    </main>
  );
}
