/* ----------------------------------------------------------------------------
server\api\set-cookie-default-lang.ts
// ----------------------------------------------------------------------------
export const ApiUrl = `/api/set-cookie-default-lang`;
----------------------------------------------------------------------------- */

// [ nac ]
import { ToString } from '~/com/lib/string';
// [ server > lib-com > * ]
import { SetCookie } from '~/server/lib-com/cookie';
import { CookieDefaultLang, JoinMultiLang, Lang } from '~/com/app/language';
// ----------------------------------------------------------------------------
type ApiReq = {
  lang?: string;
};
const ct = `server:api:set-cookie-default-lang.ts`;
export default defineEventHandler(async (event) => {
  try {
    const apiReq: ApiReq = await readBody(event);
    if (apiReq.lang !== undefined) {
      const lang = ToString(apiReq.lang);
      SetCookie(event, CookieDefaultLang, lang);
    }
    return true;
  } catch (err: any) {
    console.error(ct, err);
    return true;
  }
});
