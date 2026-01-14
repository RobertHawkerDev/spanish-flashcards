import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return { title: 'Deck' };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="py-10">
      <p>slug: {slug}</p>
    </div>
  );
}
