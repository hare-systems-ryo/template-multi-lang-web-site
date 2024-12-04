/* ----------------------------------------------------------------------------
  composables\use-store-multi-lang.ts
// ----------------------------------------------------------------------------
// [ composables > * ]
import {} from '~/composables/use-store-multi-lang';
---------------------------------------------------------------------------- */

// [dayjs]
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import en from 'dayjs/locale/en';
import { defineStore } from 'pinia';
// ----------------------------------------------------------------------------
// [ com > app > * ]
import {
  //
  type MultiLang,
  GetText,
  Lang,
  FallBackLang,
} from '~/com/app/language';

// ----------------------------------------------------------------------------
export interface StoreState {
  lang: Lang;
  isInit: boolean;
  apiSetDefaultLang: {
    ts: string;
    loading: boolean;
  };
}
// ----------------------------------------------------------------------------
export const useStoreMultiLang = defineStore('StoreMultiLang', {
  state: (): StoreState => {
    return {
      lang: FallBackLang,
      isInit: false,
      apiSetDefaultLang: {
        ts: '',
        loading: false,
      },
    };
  },
  // ----------------------------------------------------------------------------
  actions: {
    // ---------------------
    Init(arg: { lang?: Lang }) {
      if (this.isInit) return;
      // ---------------------
      const lang = arg.lang || FallBackLang;
      this.lang = lang;
      const setDayjsLang = () => {
        const lang = this.lang;
        if (lang === Lang.ja) {
          dayjs.locale(ja);
        } else {
          dayjs.locale(en);
        }
      };
      setDayjsLang();
      const apiSetDefaultLang = async () => {
        const lang = this.lang;
        const ts = dayjs().format('x');
        this.apiSetDefaultLang.ts = ts;
        if (this.apiSetDefaultLang.loading) return;
        try {
          this.apiSetDefaultLang.loading = true;
          const url = '/api/set-cookie-default-lang';
          await useFetch(url, {
            method: 'post',
            body: { lang: lang },
          });
        } catch (err) {
          console.error(err);
        } finally {
          this.apiSetDefaultLang.loading = false;
          if (this.apiSetDefaultLang.ts !== ts) apiSetDefaultLang();
        }
      };
      watch(
        () => this.lang,
        () => {
          setDayjsLang();
          apiSetDefaultLang();
        }
      );
    },
    // ---------------------
    GetText(text: MultiLang, lang = undefined, fallBackLang = undefined) {
      return computed(() => {
        if (!lang) {
          return GetText(text, lang, fallBackLang);
        }
        return GetText(text, this.lang, fallBackLang);
      }).value;
    },
    // ---------------------
  },
});
