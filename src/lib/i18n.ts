export const translations = {
  nl: {
    nav: {
      home: 'Home',
      about: 'Over Tai Chi',
      me: 'Over Mij',
      movements: 'Bewegingen',
      courses: 'Cursussen',
      blog: 'Leerlingen',
    },
    hero: {
      zenQuote: 'Yin en Yang in harmonie, beweging en rust in evenwicht',
      explore: 'Ontdek Tai Chi',
    },
    quotes: {
      title: 'Tai Chi Wijsheid',
      quote1: '"Het zachte overwint het harde, het zwakke overwint het sterke." - Laozi',
      quote2: '"Tai Chi is een reis van duizend mijl, begin met de eerste stap."',
      quote3: '"In rust bevindt men de kracht, in beweging vindt men de harmonie."',
    },
    about: {
      title: 'Over Tai Chi',
      subtitle: 'Ontdek duizendjarige wijsheid',
      history: 'Geschiedenis en Oorsprong',
      philosophy: 'Kernfilosofie',
      characteristics: 'Kenmerken',
      modern: 'Moderne Toepassing',
      practice: 'Beoefeningsmethoden',
    },
    courses: {
      title: 'Tai Chi Cursussen',
      subtitle: 'Begin uw reis naar harmonie',
      basic: 'Basis: 24 Vormen',
      intermediate: 'Intermediate: 42 Vormen',
      advanced: 'Gevorderd: 108 Vormen',
      private: 'Privélessen',
      register: 'Direct Inschrijven',
      formTitle: 'Inschrijfformulier',
      formName: 'Naam',
      formEmail: 'E-mail',
      formPhone: 'Telefoon',
      formCourse: 'Kies Cursus',
      formMessage: 'Bericht',
      formSubmit: 'Indienen',
    },
    movements: {
      title: 'Tai Chi Bewegingen',
      subtitle: 'Meester de kunst van Tai Chi',
      basic: 'Basis Technieken',
      classic: 'Klassieke Vormen',
      advanced: 'Gevorderde Technieken',
    },
    blog: {
      title: 'Leerlingen Presentatie',
      subtitle: 'Ontdek de ervaringen van onze leerlingen',
      achievements: 'Prestaties',
      stories: 'Verhalen',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Tai Chi',
      me: 'About Me',
      movements: 'Movements',
      courses: 'Courses',
      blog: 'Students',
    },
    hero: {
      zenQuote: 'Yin and Yang in harmony, movement and stillness in balance',
      explore: 'Explore Tai Chi',
    },
    quotes: {
      title: 'Tai Chi Wisdom',
      quote1: '"The soft overcomes the hard, the weak overcomes the strong." - Laozi',
      quote2: '"Tai Chi is a journey of a thousand miles, begin with the first step."',
      quote3: '"In stillness one finds strength, in movement one finds harmony."',
    },
    about: {
      title: 'About Tai Chi',
      subtitle: 'Explore thousand-year wisdom',
      history: 'History and Origins',
      philosophy: 'Core Philosophy',
      characteristics: 'Characteristics',
      modern: 'Modern Application',
      practice: 'Practice Methods',
    },
    courses: {
      title: 'Tai Chi Courses',
      subtitle: 'Begin your journey to harmony',
      basic: 'Basic: 24 Forms',
      intermediate: 'Intermediate: 42 Forms',
      advanced: 'Advanced: 108 Forms',
      private: 'Private Lessons',
      register: 'Register Now',
      formTitle: 'Registration Form',
      formName: 'Name',
      formEmail: 'Email',
      formPhone: 'Phone',
      formCourse: 'Select Course',
      formMessage: 'Message',
      formSubmit: 'Submit',
    },
    movements: {
      title: 'Tai Chi Movements',
      subtitle: 'Master the art of Tai Chi',
      basic: 'Basic Techniques',
      classic: 'Classic Forms',
      advanced: 'Advanced Techniques',
    },
    blog: {
      title: 'Student Showcase',
      subtitle: 'Discover our students experiences',
      achievements: 'Achievements',
      stories: 'Stories',
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于太极',
      me: '关于我',
      movements: '招式展示',
      courses: '课程',
      blog: '学员风采',
    },
    hero: {
      zenQuote: '阴阳调和，动静相宜',
      explore: '探索太极',
    },
    quotes: {
      title: '太极智慧',
      quote1: '"以柔克刚，以弱胜强。" - 老子',
      quote2: '"太极千里之行，始于足下。"',
      quote3: '"静中求力，动中求和。"',
    },
    about: {
      title: '关于太极',
      subtitle: '探索千年智慧',
      history: '历史渊源',
      philosophy: '核心理念',
      characteristics: '主要特点',
      modern: '现代应用',
      practice: '练习方法',
    },
    courses: {
      title: '太极课程',
      subtitle: '开启您的和谐之旅',
      basic: '基础：24式',
      intermediate: '中级：42式',
      advanced: '高级：108式',
      private: '私教课程',
      register: '立即报名',
      formTitle: '报名表单',
      formName: '姓名',
      formEmail: '邮箱',
      formPhone: '电话',
      formCourse: '选择课程',
      formMessage: '留言',
      formSubmit: '提交',
    },
    movements: {
      title: '太极招式',
      subtitle: '掌握太极艺术',
      basic: '基础技法',
      classic: '经典套路',
      advanced: '高级技法',
    },
    blog: {
      title: '学员风采',
      subtitle: '探索我们学员的经历',
      achievements: '学员成就',
      stories: '学员故事',
    },
  },
};

export type Locale = 'nl' | 'en' | 'zh';
export type TranslationKey = keyof typeof translations.nl;

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
