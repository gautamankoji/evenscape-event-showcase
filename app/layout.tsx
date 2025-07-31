import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evenscape | Curated Events and Experiences",
  description: "Discover and explore top-tier events, workshops, and experiences curated by Evenscape. Stay updated on exclusive gatherings, premium showcases, and trending happenings.",
  keywords: [
    "events", "Evenscape", "workshops", "event showcase", "premium events",
    "local events", "tech meetups", "networking", "live shows", "curated experiences"
  ],
  authors: [{ name: "Evenscape Team", url: "https://evenscape.vercel.app" }],
  creator: "Evenscape",
  publisher: "Evenscape",
  openGraph: {
    title: "Evenscape | Curated Events and Experiences",
    description: "Stay ahead with Evenscape's collection of high-quality events and experiences tailored for professionals, creators, and enthusiasts.",
    url: "https://evenscape.vercel.app/events",
    siteName: "Evenscape",
    type: "website",
    images: [
      {
        url: "https://evenscape.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Evenscape Events"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Evenscape | Curated Events and Experiences",
    description: "Explore trending and premium events with Evenscape.",
    images: ["https://evenscape.vercel.app/og-image.jpg"]
  },
  metadataBase: new URL("https://evenscape.vercel.app"),
  alternates: {
    canonical: "/events"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
