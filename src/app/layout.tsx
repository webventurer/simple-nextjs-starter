import type { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import "../styles/layout.css";
import "../styles/typography.css";
import { SimpleHeader } from "@/components/blocks/simple-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Simple Next.js Starter",
  description: "A simple Next.js starter with dynamic MDX routing",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body>
        <SimpleHeader />
        {children}
        {process.env.NODE_ENV === "development" && (
          <script src="/dev-auto-refresh.js" />
        )}
      </body>
    </html>
  );
}
