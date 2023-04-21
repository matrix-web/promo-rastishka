<template>
  <div class="default">
    <div class="content">
      <Header
        :is-auth="store.isAuth"
        :is-menu-open="isMenuOpen"
        @menu="handleMenu"
      />
      <Menu v-if="isMenuOpen" :is-auth="store.isAuth" @click="handleMenu" />
      <slot />
    </div>
    <Footer class="default__footer" />

    <ModalsContainer />

    <ModalsAlert :modal-id="Modals.ALERT" />
    <ModalsRestoreAlert :modal-id="Modals.RESTORE" />
    <ModalsRevoveryPassword :modal-id="Modals.RECOVERY_PASSWORD" />
    <ModalsLogin :modal-id="Modals.LOGIN" />
    <ModalsRegistration :modal-id="Modals.REGISTRATION" />
    <ModalsClaim :modal-id="Modals.CLAIM" />
    <ModalsCheck :modal-id="Modals.CHECK" />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
import { ref } from "vue";
import { Modals } from "~/helpers/interfaces";
import Menu from "~/components/common/Menu/Menu.vue";
import Footer from "~/components/common/Footer/Footer.vue";
import Header from "~/components/common/Header/Header.vue";
import { onMounted } from "#imports";
import { useMainStore } from "~/store";
import { setLocale } from "@vee-validate/i18n";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "#app";

const route = useRoute();
const router = useRouter();
const store = useMainStore();
setLocale("ru");

const isMenuOpen = ref(false);

const handleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(async () => {
  if (Cookies.get("token")) {
    await store.getUserInfo().catch(() => {
      if (route.name === "account") router.push("/");
      Cookies.remove("token");
    });
  }
});
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &__footer {
    margin-top: auto;
    flex: 0 0 auto;
  }
}

.content {
  flex: 1 0 auto;
}
</style>
