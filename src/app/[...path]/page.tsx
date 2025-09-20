import fs from "node:fs";
import path from "node:path";

export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path: parts } = await params;
  const filePath = parts.length ? parts.join("/") : "home";
  const { default: Page } = await import(`@/content/${filePath}.mdx`);
  return <Page />;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");

  function walk(dir: string, prefix: string[] = []): { path: string[] }[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      if (entry.isDirectory()) {
        return walk(path.join(dir, entry.name), [...prefix, entry.name]);
      }
      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const slug = entry.name.replace(/\.mdx$/, "");
        return [{ path: [...prefix, slug] }];
      }
      return [];
    });
  }

  return walk(contentDir);
}

export const dynamicParams = false;
