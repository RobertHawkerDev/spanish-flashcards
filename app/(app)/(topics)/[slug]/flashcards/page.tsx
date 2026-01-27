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

export default async function topicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = topics.find(topic => topic.slug === slug);

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
