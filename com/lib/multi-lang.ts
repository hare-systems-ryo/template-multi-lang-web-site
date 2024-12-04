/* ----------------------------------------------------------------------------
com\lib\multi-lang.ts
// ----------------------------------------------------------------------------
// [ com > lib > * ]
import {} from '~/com/lib/multi-lang';
----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
com\app\language.ts 経由で使用します
import { GetText, JoinMultiLang , Lang } from '~/com/app/language';
----------------------------------------------------------------------------- */

export type MultiLang = string | { [key: string]: string };

const isObject = (value: any) => {
  return value !== null && typeof value === 'object';
};
export const GetTextByMultiLang = (text: MultiLang, lang: string | undefined, fallBackLang: string) => {
  if (lang === undefined) {
    lang = fallBackLang;
  }
  const textIsObject = isObject(text);
  if (!textIsObject) {
    return String(text);
  }
  if (lang in (text as any)) {
    return (text as { [key: string]: string })[lang];
  } else if (fallBackLang in (text as any)) {
    // フォールバック
    console.error(`GetTextByMultiLang :: Language fallback [${lang} -> en]`, text);
    return (text as { [key: string]: string })[fallBackLang] || '';
  } else {
    console.error(`GetTextByMultiLang :: Language Error    [${lang} -> en]`, text);
    return JSON.stringify(text);
  }
};

/**
 * 複数のマルチ言語データを結合します
 * @returns MultiLangオブジェクト
 */
export const JoinMultiLang = (list: MultiLang[], seq = '\n'): MultiLang => {
  if (Array.isArray(list) === false) return '';
  if (list.length === 0) return '';
  const temp: { type: 'object' | 'string'; multiLang: MultiLang }[] = list.map((row) => {
    return { type: isObject(row) ? 'object' : 'string', multiLang: row };
  });
  const langList = temp.reduce((ret, row) => {
    if (row.type === 'string') return ret;
    Object.keys(row.multiLang).forEach((key) => {
      if (!ret.includes(key)) ret.push(key);
    });
    return ret;
  }, [] as string[]);
  // すべてマルチ言語ではない場合
  if (langList.length === 0) {
    return list.filter((row) => row !== '').join(seq);
  }
  // テキスト配列を格納するオブジェクト
  const multiData = langList.reduce((ret, lang) => {
    ret[lang] = [];
    return ret;
  }, {} as { [lang: string]: string[] });

  temp.forEach((row) => {
    if (row.type === 'string') {
      if (row.multiLang !== '') {
        // テキストで空白なし
        langList.forEach((lang) => {
          multiData[lang].push(String(row.multiLang));
        });
      }
    } else if (row.type === 'object') {
      // マルチ言語データ
      langList.forEach((lang) => {
        const langText = row.multiLang as any;
        if (lang in langText) {
          if (!langText[lang]) return;
          multiData[lang].push(langText[lang]);
        } else if ('ja' in langText) {
          if (!langText.ja) return;
          multiData[lang].push(langText.ja);
          console.error(`JoinMultiLang :: Language fallback [${lang} -> ja]`, row.multiLang);
        } else {
          console.error(`JoinMultiLang :: Language Error    [${lang} -> ja]`, row.multiLang);
        }
      });
    }
  });
  return Object.keys(multiData).reduce((ret, lang) => {
    (ret as { [key: string]: string })[lang] = multiData[lang].join(seq);
    return ret;
  }, {} as MultiLang);
};
