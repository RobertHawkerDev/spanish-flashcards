import type { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Choose a flexible ${companyName} plan to unlock over 3000 everyday Spanish words, interactive flashcards, and progress tracking tools.`,
};

export default function PricingPage() {
  return (
    <div>
      <div>
        <h1>Pricing</h1>
      </div>
    </div>
  );
}
