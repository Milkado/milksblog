// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	i18n: {
    		locales: ["en", "pt-br"],
    		defaultLocale: "en",
		routing: "manual"
  	},
	site: 'https://Milkado.github.io',
	base: 'milksblog'
});
