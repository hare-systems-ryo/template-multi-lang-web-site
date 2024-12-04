// https://nuxt.com/docs/api/configuration/nuxt-config
import dayjs from 'dayjs';
import p from './package.json';
// ----------------------------------------------------------------------------
const ct = 'nuxt.config.ts';
// ----------------------------------------------------------------------------
const env: 'development' | 'staging' | 'production' = (() => {
  const e = String(process.env.APP_ENV);
  if (e === 'development') return e;
  if (e === 'staging') return e;
  if (e === 'production') return e;
  return 'development';
})();

type Modules = Parameters<typeof defineNuxtConfig>[0]['modules'];
const modules: Modules = [];
// ----------------------------------
// Google Analytics
const gtagId = String(process.env.GOOGLE_GTAG);
if (gtagId) {
  modules.push(['nuxt-gtag', { id: gtagId }]);
  console.log(ct, `Modules >> Google Analytics TagID=${gtagId}`);
}
// ----------------------------------
// Basic Auth
if (env === 'staging') {
  modules.push([
    '@kgierke/nuxt-basic-auth',
    {
      enabled: true,
      users: [
        {
          username: 'demo',
          password: 'demo',
        },
      ],
      //
    },
  ]);
  console.log(ct, `Modules >> Basic Auth `);
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: env === 'development' },
  nitro: {
    preset: 'vercel',
  },
  modules: [
    //
    [
      '@nuxt/eslint',
      {
        checker: true,
      },
    ],
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    ...modules,
  ],

  runtimeConfig: {
    startAt: dayjs().format(),
    // const config = useRuntimeConfig();
    public: {
      // const {public:config} = useRuntimeConfig();
      app: {
        version: String(p.version) as string,
      },
      env: env,
      url: String(process.env.APP_URL) || '',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
          @use "~/assets/_tailwind" as *;
        `,
        },
      },
    },
  },
  css: ['@/assets/main.scss'],
});
