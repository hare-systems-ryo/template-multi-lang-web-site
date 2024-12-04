<script setup lang="ts">
/* ----------------------------------------------------------------------------
pages\index.vue
----------------------------------------------------------------------------- */

// ----------------------------------------------------------------------------
const { public: config } = useRuntimeConfig();
// ----------------------------------------------------------------------------
const siteTitle = 'site name';
const description = ``;
// ----------------------------------------------------------------------------
definePageMeta({
  middleware: 'language',
});
useHead({
  title: () => siteTitle,
});
useSeoMeta({
  title: () => siteTitle,
  ogUrl: config.url,
  ogSiteName: `${siteTitle}`,
  ogTitle: '${siteTitle}',
  ogDescription: description,
  // ogImage: config.url + '/assets/img/ogp.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: () => siteTitle,
  twitterDescription: description,
  // twitterImage: config.url + '/assets/img/ogp.jpg',
});
// ----------------------------------------------------------------------------
const storeMultiLang = useStoreMultiLang();
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="">
    <UiContainer class="bg-blue-300 px-2 sm:px-1"> lang:{{ storeMultiLang.lang }} </UiContainer>
  </div>
</template>

<style lang="scss" scoped></style>
