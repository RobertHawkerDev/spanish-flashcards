import type { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

export const metadata: Metadata = {
  title: 'Subcription Canceled',
  description: `Your checkout was canceled and no payment was taken. You can return to pricing, review plans, or continue learning with ${companyName}.`,
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
