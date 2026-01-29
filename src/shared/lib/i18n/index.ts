import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import ru from '@shared/config/i18n/locales/ru.json'
import en from '@shared/config/i18n/locales/en.json'

const resources = {
    en: { translation: en },
    ru: { translation: ru },
}

export const i18n = i18next.createInstance()
i18n.use(initReactI18next)

export async function init() {
    return i18n.init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    })
}
