export default function Footer() {
  return (
    <footer className="flex w-full flex-row items-center justify-center gap-10 border-t border-gray-200 bg-white px-10 py-6 sm:flex-row">
      <div>
        <p className="text-center text-sm">
          © {new Date().getFullYear()} SpanishFlashcards. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
