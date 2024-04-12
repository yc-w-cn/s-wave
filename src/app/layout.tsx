import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "S-WAVE",
  description: "S-WAVE uses whisper to translate podcast through rss.",
};

const BaseLayoutNoSSR = dynamic(
  () => import("@/components/base-layout"),
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={GeistSans.className}>
      <body className="bg-[#e8f1f7]">
        <BaseLayoutNoSSR>{children}</BaseLayoutNoSSR>
        <Toaster />
      </body>
    </html>
  );
}
