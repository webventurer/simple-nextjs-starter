import type { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import "../styles/layout.css";
import "../styles/typography.css";
import { SimpleHeader } from "@/components/SimpleHeader";
import headerStyles from "@/components/SimpleHeader/SimpleHeader.module.scss";

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
        <SimpleHeader>
          <div className={headerStyles.logo}>
            <div className={headerStyles.logoIcon}>
              <span className={headerStyles.logoText}>S</span>
            </div>
            <h1 className={headerStyles.logoText}>Simple Starter</h1>
          </div>
          <nav className={headerStyles.nav}>
            <a href="/about" className={headerStyles.navLink}>
              About
            </a>
            <a href="/contact" className={headerStyles.navLink}>
              Contact
            </a>
            <a href="/features" className={headerStyles.navLink}>
              Features
            </a>
          </nav>
        </SimpleHeader>
        {children}
      </body>
    </html>
  );
}
