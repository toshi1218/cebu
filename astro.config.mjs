import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://igrs.online",
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "static",
});
