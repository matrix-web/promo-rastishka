<template>
  <Modal
    class="registration"
    :modal-id="modalId"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    @beforeClose="reset"
  >
    <header class="registration__header">
      <p class="registration__title">Регистрация</p>
    </header>
    <VForm
      :initial-values="initial"
      class="registration__form"
      v-slot="{ meta }"
      @submit="handleSubmit"
    >
      <div class="registration__field">
        <Input
          type="text"
          name="surname"
          v-model="form.surname"
          rules="required|rus"
          placeholder="Фамилия"
          :is-error="isError('surname')"
          :error="error('surname')"
        />
      </div>
      <div class="registration__field">
        <Input
          name="name"
          type="text"
          v-model="form.name"
          rules="required|rus"
          placeholder="Имя"
          :is-error="isError('name')"
          :error="error('name')"
        />
      </div>
      <div class="registration__field">
        <Input
          name="email"
          type="email"
          v-model="form.email"
          rules="required|email|eng"
          placeholder="E-mail"
          :is-error="isError('email')"
          :error="error('email')"
        />
      </div>
      <div class="registration__field">
        <Input
          name="phone"
          type="text"
          v-model="form.phone"
          rules="required|min:18"
          placeholder="Телефон"
          :mask="'+7 (###) ###-##-##'"
          :is-error="isError('phone')"
          :error="error('phone')"
        />
      </div>
      <div class="registration__field">
        <Input
          name="city"
          type="text"
          v-model="form.city"
          rules="required|rus"
          placeholder="Город"
          :is-error="isError('city')"
          :error="error('city')"
        />
      </div>
      <div class="registration__policy">
        <Checkbox
          v-model="form.isAgreeRules"
          name="agreeRules"
          >Я согласен с
          <a class="registration__link" href="/rules.pdf"
            >Правилами акции</a
          ></Checkbox
        >
        <Checkbox
          v-model="form.isAgreeProcessPersonalData"
          name="agreeProcessPersonalData"
          >Я согласен на обработку моих персональных данных</Checkbox
        >
      </div>
      <div class="registration__captcha">
        <vue-recaptcha
          theme="light"
          size="normal"
          :tabindex="0"
          @widgetId="recaptchaWidget = $event"
          @verify="callbackVerify($event)"
          @expired="callbackExpired()"
          @fail="callbackFail()"
        />
      </div>
      <div class="registration__button">
        <Button
          type="submit"
          :disabled="
            !meta.valid ||
            !form.isAgreeProcessPersonalData ||
            !form.isAgreeRules ||
            !isRecaptcha
          "
          variant="secondary"
          is-small
          is-upper-case
          >Зарегистрироваться</Button
        >
      </div>
    </VForm>
  </Modal>
</template>

<script lang="ts" setup>
import { ModalId } from "vue-final-modal";
import { reactive, ref } from "#imports";
import { useMainStore } from "~/store";
import { useVfm } from "vue-final-modal";
import { VueRecaptcha, useRecaptcha } from "vue3-recaptcha-v2";

interface Props {
  modalId: ModalId;
  clickToClose?: boolean;
  escToClose?: boolean;
}

interface IRegistration {
  surname: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isAgreeRules: boolean;
  isAgreeProcessPersonalData: boolean;
}

defineProps<Props>();

const { resetRecaptcha } = useRecaptcha();
const recaptchaWidget = ref<any>(null);
const isRecaptcha = ref<boolean>(false);
const { open, close } = useVfm();
const store = useMainStore();
const initial: IRegistration = {
  name: "",
  surname: "",
  phone: "",
  city: "",
  email: "",
  isAgreeProcessPersonalData: false,
  isAgreeRules: false,
};
let errors = reactive<any>({});
let form = ref<IRegistration>(initial);

const isError = (name: string) => {
  return !!Object.keys(errors).length && errors.hasOwnProperty(name);
};
const error = (name: string) => {
  return isError(name) ? errors[name][0] : "";
};

const callbackVerify = (response: any) => {
  if (response) isRecaptcha.value = true;
  console.log(response);
};
const callbackExpired = () => {
  isRecaptcha.value = false;
  resetRecaptcha(recaptchaWidget.value);
  console.log("expired!");
};
const callbackFail = () => {
  isRecaptcha.value = false;
  console.log("fail");
};

const handleSubmit = async () => {
  const { name, surname, city, email, phone } = form.value;
  await store
    .registration({
      name,
      surname,
      city,
      email,
      phone,
    })
    .then((res: any) => {
      if (res.success) {
        gtag("event", "registration", { event_category: "send_form" });

        close("registration");
        open("login");
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
  form.value = initial;
  resetRecaptcha(recaptchaWidget.value);
};
</script>

<style lang="scss" scoped>
.registration {
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

  &__link {
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

  &__policy {
    .checkbox:not(:last-child) {
      margin-bottom: 25px;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__captcha {
    margin: 18px 0 22px;
  }
}
</style>
