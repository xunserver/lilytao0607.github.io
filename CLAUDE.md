# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
这是一个基于 Astro 5 的太极宣传培训网站项目，用于展示太极文化、武术和健康养生相关内容。采用中国水墨画风格设计，支持三种语言（荷兰语 nl、英语 en、中文 zh）。

## 技术栈
- **Astro 5**: 现代化的静态网站生成器，采用岛屿架构（Islands Architecture）
- **Vue 3**: 用于交互式组件（通过 @astrojs/vue 集成）
- **TypeScript**: 配置了严格类型检查（tsconfig.json 继承 astro/tsconfigs/strict）
- **Tailwind CSS 4**: 用于样式化（通过 @tailwindcss/vite 集成）
- **EmailJS**: 用于邮件发送服务（课程注册表单）
- **Sharp**: 图片优化处理库

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
│   ├── i18n/      # 国际化翻译模块（模块化设计）
│   │   ├── index.ts      # 翻译主入口和辅助函数
│   │   ├── global.ts     # 全局翻译
│   │   ├── home.ts       # 首页翻译
│   │   ├── about.ts      # 关于页面翻译
│   │   ├── me.ts         # 个人页面翻译
│   │   ├── movements.ts  # 动作页面翻译
│   │   ├── students.ts       # 学员风采页面翻译
│   │   └── courses.ts    # 课程页面翻译
│   ├── locales.ts  # 语言配置（nl, en, zh）
│   └── paths.ts    # 路径工具函数（支持多语言路由和 base path）
├── pages/          # 路由页面（基于文件系统的路由）
│   ├── index.astro # 根路径重定向
│   └── [lang]/    # 动态语言路由
│       ├── index.astro     # 首页
│       ├── about.astro     # 关于页面
│       ├── students.astro      # 学员风采页面
│       ├── courses.astro   # 课程页面
│       ├── me.astro        # 个人主页
│       ├── movements.astro # 动作展示页面
│       └── students.astro  # 学员风采页面
├── styles/         # 全局样式
│   └── global.css
└── views/          # 页面内容组件（分离的内容和路由）
    ├── home/
    │   └── HomePage.astro
    ├── about/
    │   └── AboutPage.astro
    ├── students/
    │   └── StudentsPage.astro
    ├── courses/
    │   ├── CoursesPage.astro
    │   └── RegistrationForm.vue  # 课程注册表单（Vue + EmailJS）
    ├── me/
    │   └── MePage.astro
    └── movements/
        └── MovementsPage.astro

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

### 翻译系统（模块化设计）
- **模块化结构**：翻译文件按页面分割到 `src/lib/i18n/` 目录
- **主入口**：`src/lib/i18n/index.ts` 导出所有翻译模块和辅助函数
- **语言配置**：`src/lib/locales.ts` 定义支持的语言列表
- **结构**：每个模块导出对应页面的翻译对象
- **辅助函数**：
  - `getTranslations(page, locale)`：获取指定页面的所有翻译（扁平化为单语言）
  - `getTranslation(page, locale, key)`：获取指定 key 的翻译（支持嵌套路径）
- **使用示例**：
  ```ts
  import { getTranslations, getTranslation } from '@/lib/i18n';

  // 方式 1：获取整个页面的翻译（推荐）
  const t = getTranslations('home', 'en');
  t.hero.title // 'Tai Chi Culture'

  // 方式 2：获取单个翻译
  const title = getTranslation('home', 'en', 'hero.title');

  // 方式 3：直接访问 i18n 对象
  import { i18n } from '@/lib/i18n';
  i18n.home.hero.title.en // 'Tai Chi Culture'
  ```

## 配置说明
- `astro.config.mjs`:
  - 集成 Vue 3 框架
  - Tailwind CSS 4 通过 Vite 插件集成
  - `base` 配置支持部署到子目录（通过 `ASTRO_BASE` 环境变量）
  - 服务器配置为 `host: "0.0.0.0"` 以支持网络访问
- `tailwind.config.ts`:
  - 启用 `darkMode: 'class'`（基于类的深色模式）
  - 配置了内容扫描路径（`src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`）
- `tsconfig.json`:
  - 继承 `astro/tsconfigs/strict`（严格类型检查）
  - 配置了 `@` 路径别名指向 `src` 目录
  - 支持 JSX 保留语法

## 设计特色
- **中国水墨画风格**：采用传统中国水墨画的配色和纹理
- **响应式设计**：使用 Tailwind CSS 实现多设备适配
- **深色/浅色主题**：支持主题切换功能
- **View Transitions API**：实现 SPA 式的平滑页面切换动画

## 开发注意事项

### Astro 组件
1. **代码围栏 (`---`)**: 在构建时执行，用于数据获取和导入
2. **模板部分**: HTML 模板，支持类似 JSX 的表达式
3. **客户端交互**: 使用 Vue 组件（`.vue`）或添加 `client:*` 指令

### 路由开发
- 添加新页面时，需同时更新：
  1. `src/pages/[lang]/[page].astro` - 路由入口
  2. `src/views/[page]/[Page]Page.astro` - 页面内容
  3. `src/lib/i18n/[page].ts` - 添加翻译模块
  4. `src/lib/i18n/index.ts` - 导出新翻译模块
  5. 导航菜单（`Header.astro` 中的 `global.nav`）
- 使用 `getLocalePaths()` 生成多语言路由：
  ```ts
  import { getLocalePaths } from '@/lib/locales';

  export function getStaticPaths() {
    return getLocalePaths();
  }
  ```

### 路径处理
- 使用 `src/lib/paths.ts` 中的工具函数处理路径：
  - `withBase(path)`: 添加 base path 前缀
  - `localizedPath(path, locale)`: 生成带语言的路径
  - `buildPath(path, locale)`: 完整路径构建
  - `parsePath(fullPath)`: 解析路径

### 静态资源
- `public/` 目录中的文件直接复制到构建输出（未优化）
- `src/assets/` 中的资源会被 Astro 优化处理（使用 Sharp）
- Astro 图片优化：使用 `Image` 组件自动处理响应式图片
- 推荐将高频访问的静态资源放在 `public/`，需要优化的放在 `src/assets/`

### 样式
- 全局样式：`src/styles/global.css`
- Tailwind CSS 类名用于组件样式
- 支持深色模式（ThemeToggle 组件 + `dark:` 类名）
- CSS 变量用于主题切换

### Vue 组件
- **交互式组件**：使用 Vue 3 处理客户端交互（表单、动画等）
- **注册表单**：`src/views/courses/RegistrationForm.vue` 使用 EmailJS 发送邮件
- **组件示例**：
  - `ThemeToggle.vue`：主题切换（深色/浅色模式）
  - `TaijiAnimation.vue`：太极动画组件
  - `LanguageSwitcher.vue`：语言切换器
  - `RegistrationForm.vue`：课程注册表单（使用 EmailJS）

### EmailJS 集成
- 用于课程注册表单的邮件发送
- 配置环境变量：
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- 使用示例：
  ```ts
  import emailjs from '@emailjs/browser';

  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    formData,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
  ```

## 开发和构建

### 常用命令
- `pnpm dev` - 启动开发服务器（http://localhost:4321）
- `pnpm build` - 构建生产版本到 `./dist` 目录
- `pnpm preview` - 预览生产构建

### 环境变量
创建 `.env` 文件配置以下变量：
```bash
# 部署基础路径（可选，默认为 "/"）
ASTRO_BASE=/your-subdirectory/

# EmailJS 配置（课程注册表单需要）
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 部署
- **静态托管**：构建产物在 `dist/` 目录，可直接部署到任何静态托管服务
- **GitHub Pages**：设置 `ASTRO_BASE=/repo-name/` 并配置 CNAME
- **Vercel/Netlify**：无需额外配置，自动检测 Astro 项目
- **子目录部署**：通过 `ASTRO_BASE` 环境变量配置基础路径

## 最佳实践

### 翻译管理
- 保持翻译文件模块化，每个页面对应一个翻译文件
- 使用 `getTranslations()` 获取扁平化的单语言翻译对象
- 添加新翻译时，确保三种语言（nl、en、zh）都完整
- 使用类型安全的翻译访问方式（推荐辅助函数）

### 性能优化
- 使用 Astro 的 `Image` 组件优化图片加载
- 将交互式组件分离为 Vue 组件，减少客户端 JavaScript
- 利用 View Transitions API 提升页面切换体验
- 按需加载语言翻译模块

### 组件开发
- 纯展示组件使用 `.astro` 文件
- 需要交互的组件使用 `.vue` 文件
- 遵循组件分离原则：Pages 负责路由，Views 负责内容
- 使用 TypeScript 严格类型检查

## LLM 文档
Astro 官方 LLM 文档：https://docs.astro.build/llms.txt