/* ----------------------------------------------------------------------------
server\lib-com\cookie.ts
// ----------------------------------------------------------------------------
// [ server > lib-com > * ]
import {} from '~/server/lib-com/cookie';
----------------------------------------------------------------------------- */

// [ node_modules ]
import type { H3Event } from 'h3';
// ----------------------------------------------------------------------------
/** cookie をセットする */
export const SetCookie = (event: H3Event, cookieName: string, value: string, maxAge = '2147483647') => {
  const key = `${cookieName}=${value}`;
  event.node.res.setHeader('Set-Cookie', `${key}; Path=/;Max-Age=${maxAge}`);
};
// ----------------------------------------------------------------------------
/** cookie を取得する */
export const GetCookie = (event: H3Event, cookieName: string) => {
  const cookie = event.node.req.headers.cookie || '';
  const list = cookie.replace(/ /g, '').split(';');
  const cookiesData = list.reduce((ret, row) => {
    const temp = row.split('=');
    if (temp.length === 2) {
      ret[temp[0]] = temp[1];
    }
    return ret;
  }, {} as { [key: string]: string });
  if (cookiesData[cookieName] === undefined) return null;
  return cookiesData[cookieName];
};
