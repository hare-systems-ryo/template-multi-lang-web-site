/* ----------------------------------------------------------------------------
components\lib\language.ts
// ----------------------------------------------------------------------------
// [ components > lib > * ]
import {} from '~/components/lib/language';
----------------------------------------------------------------------------- */

import parser from 'accept-language-parser';
// [ com > lib > * ]
import {
  //
  GetLang,
  type Lang,
  CookieDefaultLang,
  FallBackLang,
  CheckAcceptLanguage,
} from '~/com/app/language';
// ---------------------------------------------------
/** ブラウザ側の設定言語を取得する */
export const GetBrowserLang = (): Lang => {
  const langCookie = useCookie(CookieDefaultLang).value || '';
  if (langCookie) {
    const lang = GetLang(langCookie);
    if (lang) {
      // console.log('lang > set > cookie', lang);
      return lang;
    }
  }
  if (import.meta.client) {
    const languages = window.navigator.languages;
    if (languages.length === 0) {
      // console.log('lang > set > client :FallBackLang', FallBackLang);
      return FallBackLang;
    }
    return CheckAcceptLanguage(languages[0]);
  } else {
    const header = useRequestHeaders();
    if (!('accept-language' in header)) {
      // console.log('lang > set > server :FallBackLang', FallBackLang);
      return FallBackLang;
    }
    const languages = parser.parse(String(header['accept-language']));
    // console.log('lang > set > server languages', header['accept-language']);
    if (languages.length === 0) {
      return FallBackLang;
    }
    return CheckAcceptLanguage(languages[0].code);
  }
};
