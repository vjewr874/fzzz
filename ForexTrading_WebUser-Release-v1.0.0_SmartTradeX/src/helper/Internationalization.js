/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

// ** React Imports
import React, { useState, createContext } from 'react';

// ** Intl Provider Import
import { IntlProvider } from 'react-intl';

// ** Core Language Data
import messagesEn from '../assets/data/locales/en.json';
import messagesDe from '../assets/data/locales/de.json';
import messagesFr from '../assets/data/locales/fr.json';
import messagesPt from '../assets/data/locales/pt.json';
import messagesVi from '../assets/data/locales/vi.json';
import messagesCn from '../assets/data/locales/cn.json';
import messagesKr from '../assets/data/locales/kr.json';
import messagesMy from '../assets/data/locales/my.json';
import messagesPh from '../assets/data/locales/ph.json';

// ** Menu msg obj
const menuMessages = {
  en: { ...messagesEn },
  de: { ...messagesDe },
  fr: { ...messagesFr },
  pt: { ...messagesPt },
  vi: { ...messagesVi },
  cn: { ...messagesCn },
  kr: { ...messagesKr },
  my: { ...messagesMy },
  ph: { ...messagesPh },
};

// ** Create Context
export const Context = createContext();

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState(window.localStorage.getItem('lang') || 'vi');
  const [messages, setMessages] = useState(menuMessages[locale]);

  // ** Switches Language
  const switchLanguage = lang => {
    window.localStorage.setItem('lang', lang);
    setLocale(lang);
    setMessages(menuMessages[lang]);
  };

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="vi">
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export { IntlProviderWrapper, Context as IntlContext };
