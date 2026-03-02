import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://igrs.online",
  outDir: "./igrs-netlify",
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "static",
});
