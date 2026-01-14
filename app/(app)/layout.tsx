import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <header
        className={`sticky top-0 z-30 flex h-16 w-full flex-row items-center justify-between border-b border-b-neutral-300 bg-white px-4 sm:px-10`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Link className="flex flex-row items-center text-xl" href="/">
            <span className="mr-2 text-2xl">🇪🇸</span>
            <span className="font-bold text-red-700"> Spanish</span>
            <span className="font-bold text-orange-500">Flashcards</span>
          </Link>
          <div className="relative aspect-square h-12 overflow-hidden rounded-full">
            <Image alt="Profile" objectFit="cover" fill src="/avatar.png" />
          </div>
        </div>
      </header>
      <div className="flex w-full flex-1 flex-col">{children}</div>
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
    </div>
  );
}

const footerLinks = [
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];
