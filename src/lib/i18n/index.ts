import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  az: {
    translation: {
      // Header
      header: {
        search: 'Axtarış...',
        cart: 'Səbət',
        profile: 'Profil',
        login: 'Daxil ol',
        register: 'Qeydiyyat',
        products: 'Məhsullar'
      },
      
      // Footer
      footer: {
        about: 'Haqqımızda',
        contact: 'Əlaqə',
        products: 'Məhsullar'
      },
      
      // Auth
      auth: {
        email: 'E-poçt',
        password: 'Şifrə',
        confirmPassword: 'Şifrəni təsdiqlə',
        forgotPassword: 'Şifrəni unutmusunuz?'
      },
      
      // Products
      products: {
        sortBy: 'Sırala',
        filter: 'Filtr',
        price: 'Qiymət',
        brand: 'Brend',
        category: 'Kateqoriya',
        size: 'Ölçü',
        addToCart: 'Səbətə əlavə et',
        outOfStock: 'Stokda yoxdur'
      },
      
      // Common
      common: {
        loading: 'Yüklənir...',
        error: 'Xəta baş verdi',
        retry: 'Yenidən cəhd edin',
        clearAll: 'Hamısını təmizlə',
        apply: 'Tətbiq et'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'az',
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;