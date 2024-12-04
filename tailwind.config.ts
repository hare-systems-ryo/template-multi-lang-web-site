import type { Config } from 'tailwindcss';
// import plugin from "tailwindcss/plugin";

export default <Partial<Config>>{
  prefix: '',
  plugins: [],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        main0: '#000000',
        main1: '#000000',
        main2: '#000000',
        main3: '#000000',
        accent1: '#000000',
        accent2: '#000000',
        info: '#000000',
        link: '#000000',
        download: '#000000',
        success: '#000000',
        warning: '#000000',
        error: '#000000',
      },
    },
  },
};
