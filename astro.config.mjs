import { defineConfig, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

const shiftHeadings = () => ({
  name: "shift-headings",
  heading(node, ctx) {
    const depth = Math.min(node.depth + 2, 6);
    ctx.setProperty(node, "depth", depth);
  },
});

export default defineConfig({
  site: "https://lad.land",
  prefetch: { prefetchAll: true },
  build: { format: "file" },

  markdown: {
    shikiConfig: {
      themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
    },
    processor: satteri({
      features: {
        smartPunctuation: true,
        superscript: true,
        subscript: true,
        wikilinks: true,
        frontmatter: true,
      },
      mdastPlugins: [shiftHeadings],
    }),
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-ui",
      weights: [700],
      styles: ["normal"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-code",
      weights: [400],
      styles: ["normal"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Open Sans",
      cssVariable: "--font-content",
      weights: [500],
      styles: ["normal"],
    },
  ],

  integrations: [mdx(), sitemap()],
});
