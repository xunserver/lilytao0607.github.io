// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],

  site: 'https://taichi.astro', // 添加 site 配置（用于 i18n）

  server: {
    host: '0.0.0.0',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: false, // 默认语言不使用前缀
    },
  },
});