import { Metadata } from "next";
import contentStyles from "./page.module.scss";
import { MDXWrapper } from "./mdx-wrapper";

// Metadata export (server-side only)
export const metadata: Metadata = {
  title: "Simple Test 2 - MDX + React Components",
  description:
    "Enhanced version with MDX content and reusable React components following frontend architecture principles",
};

// Server Component (default) - no 'use client' directive needed
export default function Home() {
  return (
    <div className={contentStyles.pageWrapper}>
      {/* This wrapper provides the background gradient like simple-test */}
      <MDXWrapper />
    </div>
  );
}
