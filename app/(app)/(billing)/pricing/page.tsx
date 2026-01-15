import { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

import PricingSection from './pricing-section';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Choose a flexible ${companyName} plan to unlock over 3000 everyday Spanish words, interactive flashcards, and progress tracking tools.`,
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fbefe5] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <PricingSection />
      </main>
    </div>
  );
}
