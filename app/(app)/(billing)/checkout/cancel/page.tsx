import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancel',
  description:
    'Your checkout was canceled and no payment was taken. You can return to pricing, review plans, or continue learning with SpanishFlashcards.',
};

export default function CheckoutCancelPage() {
  return (
    <div>
      <div>
        <h1>Checkout Cancel</h1>
      </div>
    </div>
  );
}
