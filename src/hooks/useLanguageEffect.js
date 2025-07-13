import { useEffect } from 'react';
import i18n from 'i18next';
import axiosInstance from '../utils/axiosInstance'; // make sure path is correct

const useLanguageEffect = () => {
  useEffect(() => {
    const applyDirectionAndFont = (lng) => {
      const isArabic = lng === 'ar';

      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;

      document.body.classList.toggle('arabic-font', isArabic);
      document.body.classList.toggle('english-font', !isArabic);

      // ✅ Update axios language header
      axiosInstance.defaults.headers['Accept-Language'] = lng;
    };

    // Apply once on mount
    applyDirectionAndFont(i18n.language);

    // React to future language changes
    i18n.on('languageChanged', applyDirectionAndFont);

    return () => {
      i18n.off('languageChanged', applyDirectionAndFont);
    };
  }, []);
};

export default useLanguageEffect;
