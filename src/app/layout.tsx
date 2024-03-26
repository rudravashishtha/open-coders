import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/app/Header";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenCoders",
  description: "Helps You Find Your Pair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color="#3492eb" />
          <Header />
          <div className="container mx-auto">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
