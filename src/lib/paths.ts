/**
 * Path utility functions for handling base URL in Astro
 * When deploying to a subdirectory, all internal links need to include the base path
 */

// Get the base path from environment or default to '/'
// This must match the base config in astro.config.mjs
export const getBasePath = (): string => {
  const envBase = import.meta.env.ASTRO_BASE;
  if (envBase) return envBase;
  // Default to '/' to match astro.config.mjs
  return '/';
};

/**
 * Build a URL with the base path prefix
 * @param path - The path (e.g., '/about', '/zh/courses')
 * @returns Full path with base prefix
 */
export function withBase(path: string): string {
  const base = getBasePath();

  // If base is just '/', return path as-is
  if (base === '/') {
    return path;
  }

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Ensure base ends with '/' and path doesn't start with '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}

/**
 * Generate a localized URL with base path
 * @param path - The path without locale prefix (e.g., '/about')
 * @param locale - The locale ('nl', 'en', 'zh')
 * @returns Full localized path with base prefix
 */
export function localizedPath(path: string, locale: string): string {
  // For default locale (nl), don't add prefix
  if (locale === 'nl') {
    return withBase(path);
  }

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Add locale prefix with slash
  return withBase(`/${locale}/${cleanPath}`);
}

/**
 * Extract base path and remaining path from a full URL
 * Used for language switching to preserve the base path
 * @param fullPath - The full path (e.g., '/en/about')
 * @returns Object with basePath and pathWithoutLocale
 */
export function parsePath(fullPath: string): { basePath: string; pathWithoutLocale: string } {
  const base = getBasePath();

  // Remove base path from the full path
  let pathWithoutBase = fullPath;
  if (base !== '/') {
    // Remove base path from the beginning
    if (fullPath.startsWith(base)) {
      pathWithoutBase = fullPath.slice(base.length - 1); // Keep the leading slash
    }
  }

  // Remove locale prefix if present
  const localeMatch = pathWithoutBase.match(/^\/(nl|en|zh)(\/|$)/);
  if (localeMatch) {
    return {
      basePath: base,
      pathWithoutLocale: pathWithoutBase.replace(/^\/(nl|en|zh)/, '') || '/'
    };
  }

  return {
    basePath: base,
    pathWithoutLocale: pathWithoutBase
  };
}

/**
 * Build a full path with base and locale
 * @param pathWithoutLocale - Path without locale (e.g., '/about')
 * @param locale - The locale ('nl', 'en', 'zh')
 * @returns Full path with base and locale
 */
export function buildPath(pathWithoutLocale: string, locale: string): string {
  const base = getBasePath();

  // For default locale (nl), don't add locale prefix
  if (locale === 'nl') {
    return base === '/' ? pathWithoutLocale : `${base.slice(0, -1)}${pathWithoutLocale}`;
  }

  // Add locale prefix
  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  if (base === '/') {
    return `/${locale}${cleanPath}`;
  }

  return `${base.slice(0, -1)}/${locale}${cleanPath}`;
}
