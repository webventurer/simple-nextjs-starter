import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const remarkButtonsPath = path.join(
  process.cwd(),
  "tools/remark/remark-parse-buttons.mjs",
);

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkButtonsPath, "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
