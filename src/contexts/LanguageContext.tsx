import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译字典
const translations = {
  zh: {
    'nav.title': '开发者工具箱',
    'nav.home': '首页',
    'nav.cron': 'Cron生成器',
    'nav.regex': '正则生成器',
    'nav.readme': '文档',
    'home.title': '开发者工具箱',
    'home.subtitle': '简洁实用的在线工具，为开发者和技术人员提供高效的表达式生成服务',
    'home.cron.title': 'Cron表达式生成器',
    'home.cron.desc': '通过可视化界面轻松生成cron表达式，支持常用模板和自定义设置，实时预览执行时间。',
    'home.regex.title': '正则表达式生成器',
    'home.regex.desc': '提供常用正则表达式模板，支持自定义构建和实时测试验证，让正则表达式编写变得简单。',
    'readme.title': '项目文档',
    'readme.desc': '查看完整的项目介绍和使用说明'
  },
  en: {
    'nav.title': 'Developer Toolbox',
    'nav.home': 'Home',
    'nav.cron': 'Cron Generator',
    'nav.regex': 'Regex Generator',
    'nav.readme': 'Documentation',
    'home.title': 'Developer Toolbox',
    'home.subtitle': 'Concise and practical online tools providing efficient expression generation services for developers and technical professionals',
    'home.cron.title': 'Cron Expression Generator',
    'home.cron.desc': 'Easily generate cron expressions through a visual interface, supporting common templates and custom settings with real-time execution time preview.',
    'home.regex.title': 'Regular Expression Generator',
    'home.regex.desc': 'Provides common regex templates, supports custom building and real-time testing validation, making regex writing simple.',
    'readme.title': 'Project Documentation',
    'readme.desc': 'View complete project introduction and usage instructions'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}