<template>
  <Modal
    class="login"
    :modal-id="modalId"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    @before-close="reset"
  >
    <header class="login__header">
      <p class="login__title">Вход в личный кабинет</p>
    </header>
    <VForm
      @submit="handleSubmit"
      class="login__form"
      v-slot="{ meta }"
      :initial-values="form"
    >
      <div class="login__field">
        <Input
          name="email"
          v-model="form.email"
          rules="required|email"
          placeholder="E-mail"
          :is-error="isError('email')"
          :error="error('email')"
        />
      </div>
      <div class="login__field">
        <Input
          name="password"
          type="password"
          v-model="form.password"
          rules="required"
          placeholder="Пароль"
          :is-error="isError('password')"
          :error="error('password')"
        />
      </div>
      <div class="login__links">
        <button
          type="button"
          @click="handleRecoverPassword"
          class="login__text-button"
        >
          Восстановить пароль
        </button>
        <button
          type="button"
          @click="handleRegistration"
          class="login__text-button"
        >
          Зарегистироваться
        </button>
      </div>
      <div class="login__button">
        <Button
          type="submit"
          variant="secondary"
          :is-disabled="!meta.valid"
          is-small
          is-upper-case
          >Войти</Button
        >
      </div>
    </VForm>
  </Modal>
</template>

<script lang="ts" setup>
import { ModalId, useVfm } from "vue-final-modal";
import { reactive, ref } from "#imports";
import { useMainStore } from "~/store";

interface Props {
  modalId: ModalId;
  clickToClose?: boolean;
  escToClose?: boolean;
}

interface ILogin {
  email: string;
  password: string;
}

defineProps<Props>();
const initial: ILogin = {
  email: "",
  password: "",
};
const form = ref<ILogin>(initial);
let errors = reactive<any>({});
const { open, close } = useVfm();
const store = useMainStore();

const isError = (name: string) => {
  return !!Object.keys(errors).length && errors.hasOwnProperty(name);
};
const error = (name: string) => {
  return isError(name) ? errors[name][0] : "";
};
const handleSubmit = async () => {
  const { email, password } = form.value;
  await store
    .login({
      email,
      password,
    })
    .then((res: any) => {
      if (res.success) {
        gtag("event", "authorization", { event_category: "send_form" });
        close("login");
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
  form.value = { email: "", password: "" };
};

const handleRecoverPassword = () => {
  gtag("event", "reestablish", { event_category: "click_button" });

  close("login");
  open("recovery-password");
};
const handleRegistration = () => {
  close("login");
  open("registration");
};
</script>

<style lang="scss" scoped>
.login {
  &__header {
    margin-bottom: 24px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    text-align: center;
    color: var(--color-black);
  }

  &__field {
    &:not(:last-child) {
      margin-bottom: 14px;
    }
  }

  &__links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
  }

  &__text-button {
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    text-decoration: underline;
    color: var(--color-black);
    cursor: pointer;
    transition: var(--transition-duration);

    &:hover {
      text-decoration: none;
    }
  }

  &__captcha {
    margin: 18px 0 22px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
