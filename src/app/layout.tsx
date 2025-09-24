import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import googleFonts from "./googleFonts";

import "@/styles/globals.scss";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Simple Next.js Starter",
  description: "A simple Next.js starter with dynamic MDX routing",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

async function SiteHeader() {
  const { default: Layout } = await import(`@/content/layout.mdx`);
  return <Layout />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(googleFonts(), styles.layout)}>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
