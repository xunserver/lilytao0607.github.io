/**
 * 多语言路由配置
 * 用于动态路由 [lang] 参数的静态生成
 */

export type Locale = 'nl' | 'en' | 'de' | 'zh';

export const locales: Locale[] = ['nl', 'en', 'de', 'zh'];

/**
 * 获取所有语言路由的静态路径配置
 * 用于 Astro 动态路由的 getStaticPaths()
 */
export function getLocalePaths() {
  return locales.map(lang => ({ params: { lang } }));
}
