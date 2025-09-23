import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const remarkButtonsPath = path.join(
  process.cwd(),
  "tools/remark/remark-parse-buttons.mjs",
);

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkButtonsPath, "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
