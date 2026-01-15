import type { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: `Update your ${companyName} account settings including name, email, profile image, password, and security options securely.`,
};

export default function AccountSettingsPage() {
  return (
    <div>
      <div>
        <h1>Account settings</h1>
        {/* change email */}
        {/* change password */}
        {/* close account */}
      </div>
    </div>
  );
}
