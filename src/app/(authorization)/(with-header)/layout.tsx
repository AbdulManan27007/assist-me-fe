import { HeaderAuthorization } from "@/components/core/HeaderAuthorization/HeaderAuthorization";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderAuthorization />
      {children}
    </div>
  );
}
