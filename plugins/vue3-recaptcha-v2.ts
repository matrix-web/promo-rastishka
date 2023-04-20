import VueRecaptcha from "vue3-recaptcha-v2";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueRecaptcha, {
    siteKey:
      config.public.CAPTCHA_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
    alterDomain: false, // default: false
  });
});
