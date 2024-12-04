<script setup lang="ts">
/* ----------------------------------------------------------------------------
app.vue
----------------------------------------------------------------------------- */
// [dayjs]
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
// [ components > lib > * ]
import {
  //
  GetBrowserLang,
} from '~/components/lib/language';
import { GetHtmlLang, Lang } from '~/com/app/language';
// ---------------------------------------------------
dayjs.extend(advancedFormat);
// ---------------------------------------------------
const { public: config } = useRuntimeConfig();
// ---------------------------------------------------
// [ MultiLang ]

const storeMultiLang = useStoreMultiLang();
storeMultiLang.Init({ lang: GetBrowserLang() });
// ---------------------------------------------------
useHead({
  htmlAttrs: { lang: () => GetHtmlLang(storeMultiLang.lang), prefix: 'og: http://ogp.me/ns#' },
  meta: [
    { 'http-equiv': 'refresh', content: '' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0,maximum-scale=1.0' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#FFFFFF' },
    // Google Search Console
    // { name: 'google-site-verification', content: '' },
  ],
  link: [
    // ---------------------------------------------------
    { rel: 'icon', type: 'image/svg+xml', href: '/assets/favicons/favicon.svg' },
    { rel: 'apple-touch-icon', href: '/assets/favicons/192.png' },
  ],

  // script: [],
  noscript: [{ children: 'JavaScript is required' }],
  bodyAttrs: {
    class: () => (storeMultiLang.lang === Lang.ja ? 'lang-ja' : 'lang-en'),
  },
});
onMounted(() => {
  // GoogleTAG
  // if (config.env === 'production') {
  //   (window as any).dataLayer = (window as any).dataLayer || [];
  //   function gtag() {
  //     (window as any).dataLayer.push((window as any).arguments);
  //   }
  //   (gtag as any)('js', new Date());
  //   (gtag as any)('config', 'G-');
  // }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
