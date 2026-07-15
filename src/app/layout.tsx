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
  title: "MCDOGE — The Meme That Serves Smiles",
  description: "Get your uniform ready and join the delivery fleet. MCDOGE is a community-driven meme token on Solana cooking up the freshest memes and locked liquidity.",
  keywords: ["MCDOGE", "Solana memecoin", "McDonalds Doge", "sol memecoin", "locked liquidity", "crypto meme"],
  openGraph: {
    title: "MCDOGE — The Meme That Serves Smiles",
    description: "Get your uniform ready and join the delivery fleet. MCDOGE is a community-driven meme token on Solana cooking up the freshest memes and locked liquidity.",
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
    title: "MCDOGE — The Meme That Serves Smiles",
    description: "Get your uniform ready and join the delivery fleet. MCDOGE is a community-driven meme token on Solana cooking up the freshest memes and locked liquidity.",
    images: ["/logo.png"],
    creator: "@mcdogeintern1",
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
