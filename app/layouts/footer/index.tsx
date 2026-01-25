import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6';

import companyName from '@/app/utils/company-name';

export default function Footer() {
  return (
    <footer className="flex min-h-16 items-center justify-between border-t border-t-neutral-300 bg-white px-10 py-5">
      <div>
        <p className="text-sm">
          © {new Date().getFullYear()} {companyName}
        </p>
      </div>
      <div className="flex flex-row items-center gap-5">
        <a target="_blank" href="https://www.facebook.com/spanishflashcardsapp">
          <FaFacebook size={21} />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/spanishflashcardsapp"
        >
          <FaInstagram size={21} />
        </a>
        <a target="_blank" href="https://www.tiktok.com/@spanishflashcards">
          <FaTiktok size={21} />
        </a>
      </div>
    </footer>
  );
}
