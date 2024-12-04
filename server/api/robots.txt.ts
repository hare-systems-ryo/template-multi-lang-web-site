/* ----------------------------------------------------------------------------
server\api\robots.text.ts
// ----------------------------------------------------------------------------
export const ApiUrl = `/api/robots.text`;
----------------------------------------------------------------------------- */

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const ret = `
User-Agent:*
Disallow:/assets/
Sitemap:${config.public.url}/sitemap.xml
`;
  event.node.res.end(ret);
});
