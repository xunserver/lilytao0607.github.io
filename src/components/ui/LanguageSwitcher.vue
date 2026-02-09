<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { parsePath, buildPath } from '../../lib/paths';

const locales = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const currentLocale = ref('nl');
const isOpen = ref(false);

onMounted(() => {
  const currentPath = window.location.pathname;
  // Use parsePath to extract the current locale from the full path
  const localeMatch = currentPath.match(/^\/([^\/]*)/);
  const possibleLocale = localeMatch ? localeMatch[1] : '';

  // Check if the first segment is a valid locale
  if (possibleLocale && ['nl', 'en', 'de', 'zh'].includes(possibleLocale)) {
    currentLocale.value = possibleLocale;
  } else {
    currentLocale.value = 'nl';
  }

  // 点击外部关闭菜单
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const switcher = target.closest('.language-switcher');
  if (!switcher && isOpen.value) {
    isOpen.value = false;
  }
};

const switchLanguage = (localeCode: string) => {
  const currentPath = window.location.pathname;
  // Use parsePath to extract path without locale
  const { pathWithoutLocale } = parsePath(currentPath);
  // Use buildPath to build the new path with correct base and locale
  const newPath = buildPath(pathWithoutLocale, localeCode);
  window.location.href = newPath;
};

const currentLocaleData = computed(() => {
  return locales.find(l => l.code === currentLocale.value) || locales[0];
});
</script>

<template>
  <div class="relative language-switcher">
    <!-- 语言切换按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-mist/50 transition-colors duration-200"
      :aria-label="'Taal wijzigen'"
      :aria-expanded="isOpen"
    >
      <svg class="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="hidden sm:inline text-sm font-medium text-ink">
        {{ currentLocaleData.code.toUpperCase() }}
      </span>
      <svg
        class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-paper border border-border rounded-lg shadow-xl z-50"
    >
      <div class="py-1">
        <button
          v-for="locale in locales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-mist/50 transition-colors duration-200"
          :class="{
            'bg-mist/30': locale.code === currentLocale,
          }"
        >
          <span class="flex-1 text-left font-medium text-ink">{{ locale.name }}</span>
          <svg
            v-if="locale.code === currentLocale"
            class="w-5 h-5 text-accent"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
