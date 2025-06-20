import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Stack Brief - Modern Tech Newsletter",
  description:
    "Weekly insights on tech news, web development, and AI trends. Stay ahead with our curated tech brief.",
  keywords:
    "tech newsletter, web development, AI news, technology, programming",
  authors: [{ name: "Stack Brief Team" }],
  openGraph: {
    title: "Stack Brief - Modern Tech Newsletter",
    description: "Weekly insights on tech news, web development, and AI trends",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased bg-background text-foreground font-sans`}
      >
        <main className="pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
