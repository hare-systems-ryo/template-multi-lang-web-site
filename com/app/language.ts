/* ----------------------------------------------------------------------------
com\app\language.ts
// ----------------------------------------------------------------------------
// [ com > app > * ]
import {} from '~/com/app/language';
----------------------------------------------------------------------------- */

import { type MultiLang, GetTextByMultiLang } from '~/com/lib/multi-lang';
export { JoinMultiLang } from '~/com/lib/multi-lang';
export type { MultiLang } from '~/com/lib/multi-lang';
// ----------------------------------------------------------------------------
/** Cookie管理名 */
export const CookieDefaultLang = 'default-lang';
// ----------------------------------------------------------------------------

/** Webサイトで使用する言語コード一覧 */
export const Lang = {
  /** 日本語 */
  ja: 'ja', //
  /** 英語 */
  en: 'en', //
  /** 中国語（簡体） 中国本土など */
  zhSimplified: 'zh',
  /** 中国語（繁体）台湾など */
  zhTraditional: 'zh-CN',
} as const;
export type Lang = (typeof Lang)[keyof typeof Lang];

// ----------------------------------------------------------------------------
export const LangUrlRegExp = /(ja|en|zh-CN|zh)\/(.*)/;
// ----------------------------------------------------------------------------
/** 言語切替に失敗した定義のデフォルト表示言語 */
export const FallBackLang = Lang.ja;

// ----------------------------------------------------------------------------
/** ブラウザの言語コードを確認して定義の言語設定を出力する */
export const CheckAcceptLanguage = (str: string): Lang => {
  if (/^ja/.test(str)) {
    return Lang.ja;
    // -------------------------------------------------------
  } else if (/^zh$/.test(str)) {
    return Lang.zhSimplified;
  } else if (/^zh-CN$/.test(str)) {
    return Lang.zhSimplified;
    // -------------------------------------------------------
  } else if (/^zh-/.test(str)) {
    return Lang.zhTraditional;
  } else {
    return Lang.en;
  }
};

// ----------------------------------------------------------------------------
/** HTMLの設定言語 */
export const GetHtmlLang = (lang: Lang): string => {
  if (lang === Lang.ja) return 'ja';
  if (lang === Lang.en) return 'en';
  if (lang === Lang.zhSimplified) return 'zh-CN';
  if (lang === Lang.zhTraditional) return 'zh-TW';
  return 'ja';
};

// ----------------------------------------------------------------------------
/** Langの型チェック */
export const GetLang = (lang: string): Lang | null => {
  if (lang === Lang.ja) return Lang.ja;
  if (lang === Lang.en) return Lang.en;
  if (lang === Lang.zhSimplified) return Lang.zhSimplified;
  if (lang === Lang.zhTraditional) return Lang.zhTraditional;
  return null;
};

// ----------------------------------------------------------------------------
/** Urlの言語チェック */
export const CheckUrlLang = (lang: string): Lang | null => {
  if (lang === Lang.ja) return Lang.ja;
  if (lang === Lang.en) return Lang.en;
  if (lang === Lang.zhSimplified) return Lang.zhSimplified;
  if (lang === Lang.zhTraditional) return Lang.zhTraditional;
  return null;
};

// ----------------------------------------------------------------------------
/** マルチ言語テキストから表示テキストを生成 */
export const GetText = (text: MultiLang, lang: string | undefined, fallBackLang?: string | undefined) => {
  if (!fallBackLang) {
    return GetTextByMultiLang(text, lang, FallBackLang);
  }
  return GetTextByMultiLang(text, lang, fallBackLang);
};
