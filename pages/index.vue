<template>
  <MainHero @register="handleCheckRegister" />
  <MainPrizes @register="handleCheckRegister" />
  <MainRegistrationCheck @register="handleCheckRegister" />
  <MainWinners @search="handleSearch" />
  <MainQuestions />
</template>

<script setup lang="ts">
import { useMainStore } from "~/store";
import { useVfm } from "vue-final-modal";
import { onMounted } from "#imports";
import Cookies from "js-cookie";

const store = useMainStore();
const { open } = useVfm();

onMounted(async () => {
  if (Cookies.get("token")) {
    await store.getChecks();
  }
  await store.getWinners(0);
});

const handleSearch = (search: string) => {
  store.getWinners(0, search);
};

const handleCheckRegister = () => {
  if (store.isAuth) {
    open("check");
  } else {
    open("alert");
  }

  gtag("event", "check", { event_category: "click_button" });
};
</script>
<style scoped lang="scss"></style>
