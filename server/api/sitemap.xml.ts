/* ----------------------------------------------------------------------------
server\api\sitemap.xml.ts
// ----------------------------------------------------------------------------
export const ApiUrl = `/api/sitemap.xml`;
----------------------------------------------------------------------------- */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
 <loc>${config.public.url}</loc>
 <lastmod>${config.startAt}</lastmod>
</url>
<url>
 <loc>${config.public.url}/hoge</loc>
 <lastmod>${config.startAt}</lastmod>
</url>
</urlset>
`;
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(xml);
});
