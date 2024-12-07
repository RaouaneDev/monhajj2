import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Ajouter le support RTL pour l'arabe
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'fr'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-label="Changer la langue en français"
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'ar'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-label="تغيير اللغة إلى العربية"
      >
        ع
      </button>
    </div>
  );
};

export default LanguageSelector;
