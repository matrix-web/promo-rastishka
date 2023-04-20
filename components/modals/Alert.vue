<template>
  <Modal
    class="alert"
    :modal-id="modalId"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
  >
    <header class="alert__header">
      <p class="alert__title">Для участия в акции необходимо</p>
    </header>
    <div class="alert__actions">
      <Button
        @click="handleRegistration"
        variant="secondary"
        is-small
        is-upper-case
        >Зарегистироваться</Button
      >
      <Button @click="handleLogin" variant="secondary" is-small is-upper-case
        >Авторизоваться</Button
      >
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ModalId, useVfm } from "vue-final-modal";

interface Props {
  modalId: ModalId;
  clickToClose?: boolean;
  escToClose?: boolean;
}

withDefaults(defineProps<Props>(), {
  clickToClose: true,
  escToClose: true,
});

const { close, open } = useVfm();

const handleLogin = () => {
  gtag("event", "feedback", { event_category: "click_button" });
  close("alert");
  open("login");
};

const handleRegistration = () => {
  gtag("event", "registration", { event_category: "click_button" });
  close("alert");
  open("registration");
};
</script>

<style lang="scss" scoped>
.alert {
  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    text-align: center;
    color: var(--color-black);
    max-width: 225px;
  }

  &__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
