import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATION_VN } from "./vn/translations";
import { TRANSLATION_EN } from "./en/translations";
 
i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATION_EN
     },
     vn: {
       translation: TRANSLATION_VN
     }
   }
 });
 
i18n.changeLanguage("vn");