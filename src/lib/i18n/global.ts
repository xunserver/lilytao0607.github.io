/**
 * 全局翻译（导航、页脚等）
 * Global translations for navigation, footer, and other shared components
 */
export const global = {
  // ==================== 全局组件（导航等） ====================
  nav: {
    home: { nl: 'Home', en: 'Home', de: 'Startseite', zh: '首页' },
    about: { nl: 'Over Tai Chi', en: 'About Tai Chi', de: 'Über Tai Chi', zh: '关于太极' },
    me: { nl: 'Over Mij', en: 'About Me', de: 'Über Mich', zh: '关于我' },
    movements: { nl: 'Bewegingen', en: 'Movements', de: 'Bewegungen', zh: '招式展示' },
    courses: { nl: 'Cursussen', en: 'Courses', de: 'Kurse', zh: '课程' },
    students: { nl: 'Leerlingen', en: 'Students', de: 'Schüler', zh: '学员风采' },
  },
  siteName: {
    nl: 'Yang Style Tai Chi * Lily Tao',
    en: 'Yang Style Tai Chi * Lily Tao',
    de: 'Yang-Stil Tai Chi * Lily Tao',
    zh: '杨氏太极 * 陶莉',
  },
  footer: {
    description: {
      nl: 'Ontdek de oude wijsheid van Tai Chi, en streef naar harmonie tussen lichaam en geest.',
      en: 'Explore the ancient wisdom of Tai Chi, and pursue harmony between body and mind.',
      de: 'Entdecken Sie die alte Weisheit des Tai Chi und streben Sie Harmonie zwischen Körper und Geist an.',
      zh: '探索太极的古老智慧，追求身心和谐与健康养生之道。',
    },
    tagline: {
      nl: 'Eeuwenoude wijsheid · Tai Chi cultuur',
      en: 'Centuries of Wisdom · Tai Chi Culture',
      de: 'Jahrhundertealte Weisheit · Tai-Chi-Kultur',
      zh: '传承千年智慧 · 弘扬太极文化',
    },
    explore: {
      nl: 'Verkennen',
      en: 'Explore',
      de: 'Entdecken',
      zh: '探索',
    },
    community: {
      nl: 'Gemeenschap',
      en: 'Community',
      de: 'Gemeinschaft',
      zh: '社区',
    },
    contact: {
      nl: 'Contact',
      en: 'Contact',
      de: 'Kontakt',
      zh: '联系',
    },
    email: {
      label: {
        nl: 'E-mail',
        en: 'Email',
        de: 'E-Mail',
        zh: '电子邮箱',
      },
      address: 'lilytao0607@outlook.com',
    },
    philosophy: {
      nl: 'Filosofie',
      en: 'Philosophy',
      de: 'Philosophie',
      zh: '太极哲学',
    },
    copyright: {
      nl: (year: string) => `© ${year} Yang Style Tai Chi * Lily Tao. Alle rechten voorbehouden.`,
      en: (year: string) => `© ${year} Yang Style Tai Chi * Lily Tao. All rights reserved.`,
      de: (year: string) => `© ${year} Yang Style Tai Chi * Lily Tao. Alle Rechte vorbehalten.`,
      zh: (year: string) => `© ${year} 杨氏太极 * 陶莉. 保留所有权利.`,
    },
  },
};
