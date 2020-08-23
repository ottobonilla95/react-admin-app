/**
 * App Language Provider
 * Add more locales here
 */
import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es_ES';

const AppLocale = {
    en: enLang,
    es: esLang,
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);

export default AppLocale;
