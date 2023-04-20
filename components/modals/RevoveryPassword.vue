<template>
  <Modal class="recovery-password" :modal-id="modalId" @beforeClose="reset">
    <header class="recovery-password__header">
      <p class="recovery-password__title">Восстановление пароля</p>
    </header>
    <VForm
      @submit="handleSubmit"
      class="recovery-password__form"
      v-slot="{ meta, errors }"
    >
      <p class="recovery-password__label">Укажите свой e-mail</p>
      <Input
        class="recovery-password__field"
        rules="required|email"
        name="email"
        v-model="email"
        placeholder="E-mail"
        :is-error="isError('email')"
        :error="error('email')"
      />
      <Button
        class="recovery-password__button"
        type="submit"
        variant="secondary"
        :is-disabled="!meta.valid"
        is-small
        is-upper-case
        >Отправить</Button
      >
    </VForm>
  </Modal>
</template>

<script setup lang="ts">
import { ModalId, useVfm } from "vue-final-modal";
import { reactive, ref } from "#imports";
import { useMainStore } from "~/store";

interface Props {
  modalId: ModalId;
  clickToClose?: boolean;
  escToClose?: boolean;
}

defineProps<Props>();

let email = ref<string>("");
let errors = reactive<any>({});
const store = useMainStore();
const { open, close } = useVfm();

const isError = (name: string) => {
  return !!Object.keys(errors).length && errors.hasOwnProperty(name);
};
const error = (name: string) => {
  return isError(name) ? errors[name][0] : "";
};
const handleSubmit = async () => {
  await store
    .restore({
      email: email.value,
    })
    .then((res: any) => {
      if (res.success) {
        close("recovery-password");
        open("restore");
      }
    })
    .catch((error) => {
      if (error.value?.data.errors)
        Object.entries(error.value?.data.errors).forEach((item: any) => {
          errors[item[0]] = item[1];
        });
    });
};
const reset = () => {
  errors = {};
  email.value = "";
};
</script>

<style lang="scss" scoped>
.recovery-password {
  &__header {
    text-align: center;
  }

  &__title {
    margin-bottom: 26px;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    color: var(--color-black);
  }

  &__label {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    color: var(--color-black);
  }

  &__field {
    margin-bottom: 16px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__button {
    align-self: center;
  }
}
</style>
