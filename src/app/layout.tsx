import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackQuery from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FinOps Intelligence Suite",
    template: "%s | FinOps Intelligence Suite",
  },
  description: "Advanced financial modeling and cloud cost optimization tools.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RemiLebeau Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackQuery>
          <main className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-8 p-4">
            {children}
          </main>
        </TanStackQuery>
      </body>
    </html>
  );
}
