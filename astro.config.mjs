import { defineConfig, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";

export default defineConfig({
  prefetch: { prefetchAll: true },

  markdown: {
    processor: satteri({
      features: {
        smartPunctuation: true,
        superscript: true,
        subscript: true,
        wikilinks: true,
        frontmatter: true,
      },
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
      name: "Open Sans",
      cssVariable: "--font-content",
      weights: [500],
      styles: ["normal"],
    },
  ],
});
