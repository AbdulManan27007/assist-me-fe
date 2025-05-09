import { Divider } from '@/components/core/Divider';
import Header from '@/components/core/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div className="relative bg-[url('/images/banner-update1.png')] bg-center bg-cover w-full h-[120dvh] ">
<div className="absolute inset-0 "></div>
      <div className="relative">
        <div className="mb-[40.5px]">
          <Header />
          <Divider />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
