import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription Confirmed',
  description:
    'Your SpanishFlashcards subscription is active. Start learning with full access to interactive flashcards, vocabulary tracking, and premium features.',
};

export default function CheckoutSuccessPage() {
  return (
    <div>
      <div>
        <h1>Checkout Success</h1>
      </div>
    </div>
  );
}
