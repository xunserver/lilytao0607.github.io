/**
 * i18n 翻译配置主入口文件
 * Main entry point for i18n translation configuration
 * 
 * 此文件重新导出所有模块化的翻译文件，并保持与原 i18n.ts 相同的 API
 * This file re-exports all modular translation files and maintains the same API as the original i18n.ts
 */

// 导入所有模块
import { global } from './global';
import { home } from './home';
import { about } from './about';
import { me } from './me';
import { movements } from './movements';
import { students } from './students';
import { courses } from './courses';
import { courseOutline } from './courseOutline';
import { courseOutlineIntermediate } from './courseOutlineIntermediate';
import { courseOutlineAdvanced } from './courseOutlineAdvanced';
import { workshops } from './workshops';

// 重新组合成 i18n 对象（保持与原文件相同的结构）
export const i18n = {
  global,
  home,
  about,
  me,
  movements,
  students,
  courses,
  courseOutline,
  courseOutlineIntermediate,
  courseOutlineAdvanced,
  workshops,
};

// ==================== 类型定义 ====================
export type Locale = 'nl' | 'en' | 'zh';
export type PageKey = keyof typeof i18n;

// 提取翻译值的类型
type TranslationValue<T> = T extends { [key: string]: any }
  ? { [K in keyof T]: TranslationValue<T[K]> }
  : { nl: string; en: string; zh: string };

// 将嵌套的翻译对象扁平化为单语言对象
type FlattenTranslations<T, L extends Locale> = T extends Record<string, any>
  ? { [K in keyof T]: FlattenTranslations<T[K], L> }
  : T extends { [key in Locale]?: string }
  ? T[L]
  : T;

export type Translations<Page extends PageKey, L extends Locale> = FlattenTranslations<typeof i18n[Page], L>;

// ==================== 辅助函数 ====================

/**
 * 获取指定页面的所有翻译（扁平化为单语言）
 * @param page - 页面 key
 * @param locale - 语言
 * @returns 该页面的翻译对象
 *
 * @example
 * const t = getTranslations('home', 'en');
 * t.title // 'Tai Chi Culture - The path to harmony of body and mind'
 * t.hero.explore // 'Explore Tai Chi'
 */
export function getTranslations<Page extends PageKey, L extends Locale>(
  page: Page,
  locale: L
): Translations<Page, L> {
  return flattenTranslations(i18n[page], locale) as Translations<Page, L>;
}

/**
 * 获取指定 key 的翻译（支持嵌套路径）
 * @param page - 页面 key
 * @param locale - 语言
 * @param key - 翻译 key（支持点号分隔的嵌套路径，如 'hero.explore'）
 * @returns 翻译文本
 *
 * @example
 * getTranslation('home', 'en', 'hero.explore') // 'Explore Tai Chi'
 */
export function getTranslation<Page extends PageKey>(
  page: Page,
  locale: Locale,
  key: string
): string {
  const keys = key.split('.');
  let value: any = i18n[page];

  for (const k of keys) {
    value = value?.[k];
  }

  // 如果值是翻译对象，提取对应语言
  if (value && typeof value === 'object' && locale in value) {
    return value[locale] || key;
  }

  return value || key;
}

// ==================== 内部辅助函数 ====================

/**
 * 将嵌套的多语言翻译对象扁平化为单语言对象
 */
function flattenTranslations<T>(obj: T, locale: Locale): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map(item => flattenTranslations(item, locale));
  }

  // 检查是否是翻译对象（包含 nl/en/zh）
  if ('nl' in obj || 'en' in obj || 'zh' in obj) {
    return (obj as any)[locale] || obj;
  }

  // 递归处理嵌套对象
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = flattenTranslations(value, locale);
  }

  return result;
}

// ==================== 兼容性导出 ====================
// 保持旧的 API 兼容（如果有的话）
// 注意：这只是为了向后兼容，新代码应该使用 getTranslations()
export const translations = {
  nl: getTranslations('home', 'nl'),
  en: getTranslations('home', 'en'),
  zh: getTranslations('home', 'zh'),
};

/**
 * 获取全局翻译（便捷方法）
 * @deprecated 使用 getTranslations('global', locale) 代替
 */
export function getGlobalTranslations<L extends Locale>(locale: L) {
  return getTranslations('global', locale);
}
