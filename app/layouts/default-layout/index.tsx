import Footer from '../footer';
import Header from '../header';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <Header />
      <div className="container-x mx-auto flex w-full max-w-7xl flex-1 flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}
