/* ----------------------------------------------------------------------------
middleware\01.redirect.global.ts
// ----------------------------------------------------------------------------
// [ middleware > * ]
import {} from '~/middleware/01.redirect.global';
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware((to, from) => {
  const path = String(to.path);
  const storeMultiLang = useStoreMultiLang();
  if (path === '/') {
    // 言語設定が指定されていない場合のリダイレクト
    return navigateTo(`/${storeMultiLang.lang}/`);
  }
});
