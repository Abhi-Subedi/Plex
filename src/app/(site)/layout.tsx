import { SiteHeader } from "./_components/site-header";
import { SiteFooter } from "./_components/site-footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
