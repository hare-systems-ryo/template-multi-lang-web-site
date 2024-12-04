/* ----------------------------------------------------------------------------
server\middleware\main.ts
// ----------------------------------------------------------------------------
// [ server > middleware > * ]
import {} from '~/server/middleware/main';
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
const ct = `server:middleware:main.ts`;
// ----------------------------------------------------------------------------
export default defineEventHandler((event) => {
  try {
    const pathname = getRequestURL(event).pathname;
    if (/^\/robots\.txt/.test(pathname)) {
      sendRedirect(event, '/api/robots.txt', 302);
      return false;
    }
    if (/^\/sitemap\.xml/.test(pathname)) {
      sendRedirect(event, '/api/sitemap.xml', 302);
      return false;
    }
  } catch (err) {
    console.error(ct, err);
  }
});
