import Header from '../header';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-neutral-100">
      <Header />
      <div className="flex w-full flex-1 flex-col overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-0">
        {children}
      </div>
    </div>
  );
}
