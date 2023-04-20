import QrReader from 'vue3-qr-reader';
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(QrReader);
});
