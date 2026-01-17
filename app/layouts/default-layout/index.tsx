import Header from '../header';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
}
