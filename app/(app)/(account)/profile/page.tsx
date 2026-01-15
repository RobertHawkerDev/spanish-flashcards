import type { Metadata } from 'next';

import companyName from '@/app/utils/company-name';

export const metadata: Metadata = {
  title: 'Profile',
  description: `View your ${companyName} profile with avatar, learning stats, words learned, correct and wrong answers, and recent decks.`,
};

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      {/* avatar */}
      {/* name */}
      {/* words learned */}
      {/* words correct */}
      {/* words wrong */}
      {/* recent decks */}
    </div>
  );
}
