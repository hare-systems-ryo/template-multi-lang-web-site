/* ----------------------------------------------------------------------------
middleware\language.ts
// ----------------------------------------------------------------------------
// [ middleware > * ]
import {} from '~/middleware/language';
----------------------------------------------------------------------------- */

import { FallBackLang, CheckUrlLang } from '~/com/app/language';
// -------------------------------------------------------------
export default defineNuxtRouteMiddleware((to, from) => {
  const langString = String(to.params.lang);
  // URLの言語設定をチェック
  if (CheckUrlLang(langString) === null) {
    const fullPath = to.fullPath;
    const redirectUrl = fullPath.replace(/\/([^/]*)\//, `/${FallBackLang}/`);
    return navigateTo(redirectUrl);
  }
});
