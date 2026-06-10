import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const translationFa = {};

export const useI18n = () => {
  i18n
    .use(initReactI18next) //passes i118n down to react-i118next
    .init({
      resources: {
        fa: { translation: translationFa },
      },
      lng: "fa",
      fallbackLng: "fa",
      interpolation: { escapeValue: false },
    });
};
