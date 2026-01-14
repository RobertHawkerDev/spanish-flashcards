import Link from 'next/link';

import footerLinks from './footer-links';

export default function Footer() {
  return (
    <footer className="flex w-full flex-row items-center justify-between gap-10 border-t border-gray-200 bg-white px-10 py-6 sm:flex-row">
      <div className="flex items-center gap-10">
        {footerLinks.map(link => (
          <Link
            className="text-sm hover:underline"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div>
        <p className="text-center text-sm">
          © {new Date().getFullYear()} SpanishFlashcards. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
