import "./globals.css";
import favicon from "./favicon.png";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { StoreProvider } from "@/store/storeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "AssistMeIn",
  description: "AssistMeIn app",
  icons: [favicon.src],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
        </body>
    </html>
  );
}
