import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { words } from '@/app/data/words';
import companyName from '@/app/utils/company-name';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const deck = words.find(word => word.slug === slug);

  if (!deck) {
    return {
      title: 'Deck Not Found',
      description: `The vocabulary deck you're looking for doesn't exist or may have been removed. Browse available ${companyName} decks.`,
    };
  }

  return {
    title: `Spanish ${deck.name} Vocabulary`,
    description: `View all vocabulary words in the ${deck.name} deck before practicing them with our interactive flashcards.`,
  };
}

export default async function WordsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const deck = words.find(word => word.slug === slug);

  if (!deck) return notFound();

  return (
    <main className="flex flex-col items-center px-6 py-10 pb-16 sm:px-10">
      <div className="flex w-full flex-col items-center lg:w-2/3 2xl:w-1/2">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold lg:text-3xl">{deck.name} Words</h1>
          <Link
            className="hidden min-w-52 items-center justify-center rounded-full bg-amber-400 px-6 py-4 text-center font-semibold text-black hover:bg-amber-500 lg:flex"
            href={`/${deck.slug}`}
          >
            Learn with Flashcards
          </Link>
        </div>

        <div className="mt-7 w-full overflow-hidden rounded-xl border border-neutral-300 bg-white">
          {deck.words.map((word, index) => {
            const isLast = index === deck.words.length - 1;

            return (
              <div
                key={word.id}
                className={`flex flex-row items-center gap-8 ${isLast ? 'border-b-0' : 'border-b'} border-b-neutral-300 px-6 py-4`}
              >
                <div className="relative size-16">
                  <Image fill alt="" src={`/words/${word.icon_svg}`} />
                </div>
                <div>
                  <p className="text-xl font-semibold">
                    {word.spanish_article} {word.spanish}
                  </p>
                  <p className="mt-0.5 text-base">{word.english}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          className="mt-10 flex max-w-96 min-w-52 items-center justify-center rounded-full bg-amber-400 px-6 py-4 text-center font-semibold text-black hover:bg-amber-500"
          href={`/${deck.slug}`}
        >
          Learn with Flashcards
        </Link>
      </div>
    </main>
  );
}
