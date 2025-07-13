import i18n from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';


import { useDispatch } from 'react-redux';
import { setLanguage } from '../features/language/languageSlice';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen ] = useState(false);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const dispatch = useDispatch();

  console.log(isOpen)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    
    localStorage.setItem("lang", lng)


    dispatch(setLanguage(lng))

      document.cookie = `i18next=${lng}; path=/; max-age=31536000; SameSite=None; Secure`;
    document.documentElement.lang = lng;
  };

  return (
    <div className="relative group ">
      <button 
        className="flex items-center space-x-1 text-gray-600 hover:text-green-700 transition-colors cursor-pointer"
        aria-label={t('header.language_switcher')}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <FaGlobe className="max-md:w-5 max-md:h-5 md:w-7 md:h-7" />
      </button>
      
      {
        isOpen && <div className={`absolute ${currentLanguage === 'en' ? 'left-0' : 'right-0'}  top-4 mt-2 w-24 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50  transition-all duration-200`}>
        <button
          onClick={() => changeLanguage('en')}
          className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === 'en' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-green-50'}`}
        >
          {t('language.english')}
        </button>
        <button
          onClick={() => changeLanguage('ar')}
          className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === 'ar' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-green-50'}`}
        >
          {t('language.arabic')}
        </button>
      </div>
      }
      
    </div>
  );
};

export default LanguageSwitcher;