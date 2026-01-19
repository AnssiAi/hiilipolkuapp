import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const supportedLanguages: Record<string,string> = {
    fi: "Finnish",
    en: "English"
}

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: Object.keys(supportedLanguages),
        debug: false,
        interpolation: {
            escapeValue: true,
        },
    })

export default i18n;