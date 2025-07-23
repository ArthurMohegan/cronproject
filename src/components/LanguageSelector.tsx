import { useState } from "react";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  onLanguageChange: (language: 'zh' | 'en') => void;
  currentLanguage: 'zh' | 'en';
}

export default function LanguageSelector({ onLanguageChange, currentLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-500 hover:text-white transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLang?.flag}</span>
        <span>{currentLang?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              } first:rounded-t-md last:rounded-b-md`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}