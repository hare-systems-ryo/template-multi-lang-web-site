<script setup lang="ts">
/* ----------------------------------------------------------------------------
  layouts\default.vue
---------------------------------------------------------------------------- */

import { LangUrlRegExp, CheckUrlLang, Lang } from '~/com/app/language';
// ----------------------------------------------------------------------------
const router = useRouter();
const route = useRoute();
// ----------------------------------------------------------------------------
const storeMultiLang = useStoreMultiLang();
// URLの言語設定を反映
const paramLang = CheckUrlLang(String(route.params.lang));
if (paramLang !== null) {
  storeMultiLang.lang = paramLang;
}
const swhichlang = (switchLang: Lang) => {
  // lang;
  storeMultiLang.lang = switchLang;
  const fullPath = route.fullPath;
  const redirectUrl = fullPath.replace(LangUrlRegExp, `${switchLang}/$2`);
  router.push(redirectUrl);
};
// ----------------------------------------------------------------------------
</script>
<template>
  <div class="layout flex flex-col">
    <header ref="headerEml" class="h-[60px] w-full flex-none bg-white flex items-center px-2">
      <div class="p-0 sm:p-2 mx-auto sm:mx-0 h-full">
        <NuxtLink to="/" class="">
          <NuxtImg src="/assets/img/logo.svg" class="object-contain w-full h-full" alt="Logo" />
        </NuxtLink>
      </div>
      <div class="ms-auto hidden sm:flex items-center">
        <div class="rounded-full border border-1 border-blue-700 pt-2 ps-2 pb-1 pe-2 me-2">
          <i class="text-blue-700 fa-solid fa-phone text-[20px]"></i>
        </div>
      </div>
    </header>
    <section class="flex-1 bg-red-400">
      <slot />
      <div @click="swhichlang(Lang.ja)">ja</div>
      <div @click="swhichlang(Lang.en)">en</div>
      <div @click="swhichlang(Lang.zhSimplified)">中国語（簡体）</div>
      <div @click="swhichlang(Lang.zhTraditional)">中国語（繁体）台湾など</div>
      <div class="py-4 sm:py-10"></div>
    </section>
    <footer class="flex-none mt-auto h-[60px] w-full bg-gray-400">footer</footer>
    <teleport to="body"> </teleport>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  // min-height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  min-height: 100svh;
}
</style>
