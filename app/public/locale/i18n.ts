import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';
import enTranslation from './en/translation.json';
import frTraduction from './fr/translation.json';

export const resources = {
	en: {
		translation: enTranslation,
	},
	fr: {
		translation: frTraduction
	}
};
const options = {
	order: ['querystring', 'navigator'],
	lookupQuerystring: 'lng'
}

i18next.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		debug: true,
		resources,
		detection: options,
		fallbackLng: 'en',
		supportedLngs: ['en', 'fr'],
	});