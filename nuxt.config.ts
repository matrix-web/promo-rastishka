// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  ssr: false,
  runtimeConfig: {
    public: {
      NUXT_BASE_API_URL: process.env.NUXT_BASE_API_URL,
      CAPTCHA_KEY: process.env.NUXT_APP_CAPTCHA_KEY,
      baseURL:
        process.env.NUXT_PUBLIC_BASE_URL ||
        'https://develop-u2c-rastishka-backend.dev.u2c.su/api',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Растишка',
      meta: [
        {
          name: 'description',
          content: 'Растишка. Потому что полезное должно быть каждый день',
        },
        { property: 'og:type', content: 'website' },
        { name: 'og:title', property: 'og:title', content: 'Растишка' },
        { property: 'og:site_name', content: '' },
        { property: 'og:image', content: '' },
        {
          name: 'og:description',
          property: 'og:description',
          content: 'Растишка. Потому что полезное должно быть каждый день',
        },
        { name: 'theme-color', content: '#ffffff' },
        {
          rel: 'apple-touch-icon',
          sizes: '57x57',
          href: '/apple-icon-57x57.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: '/apple-icon-60x60.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '72x72',
          href: '/apple-icon-60x60.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: '/apple-icon-76x76.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: '/apple-icon-114x114.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: '/apple-icon-114x114.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: '/apple-icon-114x114.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: '/apple-icon-152x152.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-icon-152x152.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/android-icon-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `
             (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
             m[i].l=1*new Date();
             for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
             k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
             (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

             ym(93171299, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
             });
          `,
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-263581708-1',
          async: true,
        },
        {
          type: 'text/javascript',
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-263581708-1');
          `,
        },
      ],
      noscript: [
        {
          children: `<div><img src=\"https://mc.yandex.ru/watch/93171299\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div>`,
        },
      ],
    },
  },
  css: [
    '@/assets/styles/main.scss',
    'vue-final-modal/style.css',
    'vue3-toastify/dist/index.css',
    'dropzone-vue/dist/dropzone-vue.common.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/breakpoints.scss" as *;',
        },
      },
    },
  },
  pageTransition: { name: 'fade', mode: 'out-in' },
  modules: ['@pinia/nuxt', 'nuxt-swiper'],
  components: { global: true, dirs: ['~/components'] },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
};
