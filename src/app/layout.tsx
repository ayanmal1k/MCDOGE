import type { Metadata } from "next";
import { Sora, Syne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const mazin = localFont({
  src: "../../public/mazin/Mazin/MazinDEMO-Black.otf",
  variable: "--font-mazin",
});

export const metadata: Metadata = {
  title: "MCDOGE — The Happiest Restaurant in Crypto",
  description: "Welcome to MCDOGE, the happiest restaurant in crypto. We serve original characters, daily episodes, fresh memes, and a community where everyone has a seat at the table.",
  keywords: ["MCDOGE", "crypto restaurant", "Solana meme coin", "McDonalds Doge", "MCDOGE characters", "MCDOGE episodes", "sol memecoin"],
  openGraph: {
    title: "MCDOGE — The Happiest Restaurant in Crypto",
    description: "Welcome to MCDOGE, the happiest restaurant in crypto. We serve original characters, daily episodes, fresh memes, and a community where everyone has a seat at the table.",
    url: "https://mcdoge.xyz",
    siteName: "MCDOGE",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "MCDOGE Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCDOGE — The Happiest Restaurant in Crypto",
    description: "Welcome to MCDOGE, the happiest restaurant in crypto. We serve original characters, daily episodes, fresh memes, and a community where everyone has a seat at the table.",
    images: ["/logo.png"],
    creator: "@mcdogecryprest",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${syne.variable} ${mazin.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
