import type { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

export const metadata: Metadata = {
  title: 'Manage Billing',
  description: `Manage your ${companyName} subscription, billing details, payment methods, and invoices securely from your account dashboard.`,
};

export default function ManageBillingPage() {
  return (
    <div>
      <div>
        <h1>Manage Billing</h1>
      </div>
    </div>
  );
}
