# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个基于 Astro 5 的太极宣传培训网站项目，用于展示太极文化、武术和健康养生相关内容。支持三种语言（荷兰语 nl、英语 en、中文 zh）。

## 技术栈
- **Astro 5**: 现代化的静态网站生成器，采用岛屿架构（Islands Architecture）
- **Vue 3**: 用于交互式组件（通过 @astrojs/vue 集成）
- **TypeScript**: 配置了严格类型检查（tsconfig.json 继承 astro/tsconfigs/strict）
- **Tailwind CSS**: 用于样式化（通过 @tailwindcss/vite 集成）

## 项目结构
```
src/
├── assets/         # 静态资源（图片等）
├── components/     # 可复用组件
│   ├── layout/    # 布局组件（Header, Footer, ThemeToggle）
│   ├── ui/        # UI 组件（LanguageSwitcher, FloatingCTA）
│   └── taiji/     # 太极特色组件（TaijiAnimation）
├── layouts/        # 页面布局模板
│   └── BaseLayout.astro
├── lib/            # 工具库
│   ├── i18n.ts    # 国际化翻译配置（所有页面翻译）
│   └── paths.ts   # 路径工具函数（支持多语言路由和 base path）
├── pages/          # 路由页面（基于文件系统的路由）
│   ├── index.astro # 根路径重定向
│   └── [lang]/    # 动态语言路由
│       ├── index.astro
│       ├── about.astro
│       ├── blog.astro
│       ├── courses.astro
│       ├── me.astro
│       └── movements.astro
├── styles/         # 全局样式
│   └── global.css
└── views/          # 页面内容组件
    ├── home/
    ├── about/
    ├── blog/
    ├── courses/
    ├── me/
    └── movements/

public/
├── image/          # 静态图片资源（直接复制到构建输出）
└── favicon.*       # 网站图标
```

## 架构设计

### 路由与国际化
- 使用 **动态路由** `src/pages/[lang]/` 实现多语言支持
- 支持 3 种语言：`nl`（荷兰语，默认）、`en`（英语）、`zh`（中文）
- 路由格式：
  - `/` → 根路径（重定向）
  - `/about` → 荷兰语（默认语言）
  - `/en/about` → 英语
  - `/zh/about` → 中文

### 组件分离架构
- **Pages (`src/pages/[lang]/`)**: 路由入口，负责接收 `lang` 参数并渲染对应的 View 组件
- **Views (`src/views/`)**: 页面内容组件，接收 `locale` prop 并获取对应的翻译内容

### 翻译系统
- 所有翻译存储在 `src/lib/i18n.ts` 中
- 结构：`i18n[pageKey][section][key][locale]`
- 使用示例：
  ```ts
  import { i18n } from '@/lib/i18n';
  const title = i18n.home.hero.title[locale]; // locale = 'nl' | 'en' | 'zh'
  ```

## 配置说明
- `astro.config.mjs`:
  - 集成 Vue 3 框架
  - Tailwind CSS 通过 Vite 插件集成
  - `base` 配置支持部署到子目录（通过 `ASTRO_BASE` 环境变量）

## 开发注意事项

### Astro 组件
1. **代码围栏 (`---`)**: 在构建时执行，用于数据获取和导入
2. **模板部分**: HTML 模板，支持类似 JSX 的表达式
3. **客户端交互**: 使用 Vue 组件（`.vue`）或添加 `client:*` 指令

### 路由开发
- 添加新页面时，需同时更新：
  1. `src/pages/[lang]/[page].astro` - 路由入口
  2. `src/views/[page]/[Page]Page.astro` - 页面内容
  3. `src/lib/i18n.ts` - 添加翻译
  4. 导航菜单（Header.astro 中的 `global.nav`）

### 路径处理
- 使用 `src/lib/paths.ts` 中的工具函数处理路径：
  - `withBase(path)`: 添加 base path 前缀
  - `localizedPath(path, locale)`: 生成带语言的路径
  - `buildPath(path, locale)`: 完整路径构建
  - `parsePath(fullPath)`: 解析路径

### 静态资源
- `public/` 目录中的文件直接复制到构建输出
- `src/assets/` 中的资源会被 Astro 优化处理

### 样式
- 全局样式：`src/styles/global.css`
- Tailwind CSS 类名用于组件样式
- 支持深色模式（ThemeToggle 组件）

## LLM 文档
Astro 官方 LLM 文档：https://docs.astro.build/llms.txt