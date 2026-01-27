import clsx from 'clsx';

import companyName from '@/app/utils/company-name';

import socialLinks from './social-links';

export default function Footer() {
  const footerClasses = clsx(
    'min-h-16 w-full',
    'border-t border-neutral-50 bg-white',
    'dark:border-neutral-800 dark:bg-neutral-950/70 backdrop-blur',
    'pt-12 pb-[calc(env(safe-area-inset-bottom)+4rem)]',
    'lg:pt-6 lg:pb-8',
  );

  return (
    <footer className={footerClasses}>
      <div className="container-x mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 lg:flex-row lg:gap-6">
        <div className="flex flex-row items-center gap-5">
          {socialLinks.map(socialLink => (
            <a
              target="_blank"
              rel="noreferrer noopener"
              key={socialLink.url}
              href={socialLink.url}
              aria-label={socialLink.name}
            >
              {socialLink.icon}
            </a>
          ))}
        </div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-400">
          © {new Date().getFullYear()} {companyName}
        </p>
      </div>
    </footer>
  );
}
