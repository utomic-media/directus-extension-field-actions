import { useI18n } from 'vue-i18n';

import germanMessages from '../lang/de-DE';
import englishMessages from '../lang/en-US';
import portugueseMessages from '../lang/pt-PT';

// Globally track which locales we've already loaded
const loadedLocales = new Set<string>();

export function useAppTranslations() {
  // Map of locale messages
  const localeMessages: Record<string, any> = {
    'en-CA': englishMessages,
    'en-GB': englishMessages,
    'en-US': englishMessages,
    'de-DE': germanMessages,
    'pt-BR': portugueseMessages,
    'pt-PT': portugueseMessages,
  };

  /**
   * = = = = = = = = = = = = = = = = = = = = = = = = =
   * Loads all translations for the current locale
   */
  function loadLocaleMessages() {
    const { locale, mergeLocaleMessage } = useI18n();

    // Always load the fallback locale (English)
    if (!loadedLocales.has('en-US')) {
      mergeLocaleMessage('en-US', localeMessages['en-US']);
      loadedLocales.add('en-US');
    }

     // Load the current locale if not already loaded
    if (localeMessages[locale.value] && !loadedLocales.has(locale.value)) {
      mergeLocaleMessage(locale.value, localeMessages[locale.value]);
      loadedLocales.add(locale.value);
    }
  }

  return {loadLocaleMessages}
}
