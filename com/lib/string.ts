/* ----------------------------------------------------------------------------
com\lib\string.ts
// ----------------------------------------------------------------------------
// [ com > lib > *  ]
import {} from '~/com/lib/string';
----------------------------------------------------------------------------- */

/**
 * 指定した文字数にカットした文字を返却する
 * @param  text 対象の文字列
 * @param  len カットしたい文字数
 * @param  addWard 省略文字（省略した場合「...」）
 * @returns カンマが挿入された文字列
 */
export const CutLen = (text: string, len: number, addWard = '') => {
  if (text === null) return '';
  if (len === 0) return text;
  return text.substring(0, len) + addWard;
};

export const LenB = (str: string) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[ -~]/)) {
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
};

/**
 * 指定した文字数にカットした文字を返却する
 * @param  text 対象の文字列
 * @param  len カットしたい文字数(バイト計算)
 * @param  w 省略文字（省略した場合「...」）
 * @returns カンマが挿入された文字列
 */
export const CutLenB = (text: string, len: number, w: string | undefined = undefined) => {
  if (text === null) return '';
  if (len === 0) return '';
  w = w === undefined ? '...' : w;
  let tempStr = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i].match(/[ -~]/)) {
      // 半角
      if (LenB(tempStr + w) + 1 > len) {
        break;
      }
    } else if (LenB(tempStr + w) + 2 > len) {
      // 全角
      break;
    }
    tempStr += text[i];
  }
  text = tempStr + w;
  return text;
};

/**
 * 指定した文字数にカットした文字を返却する
 * @param  text 対象の文字列
 * @param  len カットしたい文字数(バイト計算)
 * @param  w 埋める文字 半角で指定すること
 * @returns カンマが挿入された文字列
 */
export const PaddingLeft = (text: string | number | null, len: number, w: string, ryaku = ''): string => {
  text = text == null ? '' : String(text);
  const textlen = LenB(text);
  len = len - LenB(ryaku);
  if (textlen <= len) {
    return w.repeat(len - textlen) + text;
  } else {
    let str = '';
    for (let i = 0; i < text.length; i++) {
      if (text[text.length - i - 1].match(/[ -~]/)) {
        // 半角
        if (LenB(str) + 1 > len) {
          break;
        }
      } else if (LenB(str) + 2 > len) {
        // 全角
        break;
      }
      str = text[text.length - i - 1] + str;
    }
    text = str;
    return ryaku + w.repeat(len - LenB(text)) + text;
  }
};

/**
 * 指定した文字数にカットした文字を返却する
 * @param  text 対象の文字列
 * @param  len カットしたい文字数(バイト計算)
 * @param  w 埋める文字
 * @returns カンマが挿入された文字列
 */
export const PaddingRight = (text: string | number | null, len: number, w: string, ryaku = ''): string => {
  text = text == null ? '' : String(text);
  const textlen = LenB(text);
  len = len - LenB(ryaku);
  if (textlen <= len) {
    return text + w.repeat(len - textlen);
  } else {
    let str = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i].match(/[ -~]/)) {
        // 半角
        if (LenB(str) + 1 > len) {
          break;
        }
      } else if (LenB(str) + 2 > len) {
        // 全角
        break;
      }
      str = str + text[i];
    }
    text = str;
    return text + w.repeat(len - LenB(text)) + ryaku;
  }
};

// [ 変換 ]
const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export const ToString = (value: any): string => {
  try {
    if (value === null || value === undefined) return '';
    let text = '';
    switch (typeOf(value)) {
      case 'array':
      case 'object':
        text = '\n' + JSON.stringify(value, null, 2);
        break;
      default:
        text = `${value}`;
    }
    return text;
  } catch {
    return '';
  }
};

export const ToStringNullable = (value: any): string | null => {
  try {
    if (value === null || value === undefined) return null;
    let text = '';
    switch (typeOf(value)) {
      case 'array':
      case 'object':
        text = '\n' + JSON.stringify(value, null, 2);
        break;
      default:
        text = `${value}`;
    }
    return text;
  } catch {
    return '';
  }
};
