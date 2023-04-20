<template>
  <Modal
    class="check"
    :modal-id="modalId"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    @beforeClose="reset"
  >
    <header class="check__header">
      <p class="check__title">Добрый день</p>
    </header>
    <div class="check__content">
      <ul class="rules-list">
        <li v-for="(rule, idx) in rules" :key="idx" class="rules-list__item">
          {{ idx + 1 }}. {{ rule }}
        </li>
      </ul>

      <div v-if="type === 'mobile'">
        <qr-stream @decode="onDecodeStream" class="mb stream"></qr-stream>

        <div v-if="qrText" style="text-align: center; margin-top: 20px">
          <strong>Данные по</strong> QR-коду указаны ниже
        </div>
        <div class="check__upload">
          <label class="">
            <input
              type="file"
              @change="onDecode"
              accept="image/jpeg, image/png, image/jpg"
            />

            <span class="check__upload-button">Загрузить фото чека</span>
          </label>
        </div>
      </div>
      <div class="check__dropzone" v-if="type !== 'mobile'">
        <DropZone
          url="https://httpbin.org/post"
          :maxFiles="6"
          :uploadOnDrop="true"
          :multipleUpload="true"
          :parallelUpload="6"
          :retryOnError="true"
          :maxFileSize="5000000"
          :acceptedFiles="['png', 'jpeg', 'jpg']"
          @uploaded="onDecodeDropzone"
        >
          <template v-slot:message
            ><div class="dropzone-text">
              Перетащите фото чека или нажмите для выбора
            </div></template
          >
        </DropZone>
      </div>

      <!--      <div class="check__action">-->
      <!--        <Button-->
      <!--          v-if="!isShowCheckForm"-->
      <!--          @click="isShowCheckForm = true"-->
      <!--          variant="secondary"-->
      <!--          is-small-->
      <!--          is-upper-case-->
      <!--          >Загрузить чек</Button-->
      <!--        >-->
      <!--      </div>-->
      <Transition name="fade">
        <VForm
          v-if="isShowCheckForm"
          @submit="handleSubmit"
          class="check-form"
          v-slot="{ meta, errors }"
          :initial-values="initial"
        >
          <p class="check-form__title">Введите данные вручную</p>
          <div class="check-form__field">
            <Input
              name="fp"
              v-model="form.fp"
              placeholder="ФП"
              rules="required|numeric"
              :is-error="isError('fp')"
              :error="error('fp')"
            />
          </div>
          <div class="check-form__field">
            <Input
              name="fn"
              v-model="form.fn"
              placeholder="ФН"
              rules="required|numeric"
              :is-error="isError('fn')"
              :error="error('fn')"
            />
          </div>
          <div class="check-form__field">
            <Input
              name="fd"
              v-model="form.fd"
              placeholder="ФД"
              rules="required|numeric"
              :is-error="isError('i')"
              :error="error('i')"
            />
          </div>
          <div class="check-form__field">
            <Input
              name="date"
              v-model="form.date"
              placeholder="Дата"
              rules="required|date|max-date"
              :mask="'##.##.####'"
              :is-error="isError('date')"
              :error="error('date')"
            />
          </div>
          <div class="check-form__field">
            <Input
              name="time"
              v-model="form.time"
              placeholder="Время"
              rules="required|time|min:4"
              :mask="'##:##'"
              :is-error="isError('time')"
              :error="error('time')"
            />
          </div>
          <div class="check-form__field">
            <Input
              name="sum"
              v-model="form.sum"
              placeholder="Сумма"
              rules="required"
              :is-error="isError('s')"
              :error="error('s')"
            />
          </div>
          <div class="check-form__button">
            <Button
              type="submit"
              variant="secondary"
              :is-disabled="!meta.valid"
              is-small
              is-upper-case
              >Отправить</Button
            >
          </div>
        </VForm>
      </Transition>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ModalId, useVfm } from "vue-final-modal";
import { computed, reactive, ref, useBreakpoints } from "#imports";
import QrScanner from "qr-scanner";
import { useMainStore } from "~/store";

interface Props {
  modalId: ModalId;
  clickToClose?: boolean;
  escToClose?: boolean;
  accept: "image/png" | "image/jpg";
}

interface ICheckFormData {
  fp: string;
  fn: string;
  fd: string;
  date: string;
  time: string;
  sum: string;
}

const { close } = useVfm();
const store = useMainStore();
const { type } = useBreakpoints();
const isShowCheckForm = ref<boolean>(false);
const qrText = ref<boolean>(false);
const result = ref<string>("");
const t = ref<string>("");
const qrData = ref<string[]>([]);
const files = ref<File[]>();
let errors = reactive<any>({});

const initial: ICheckFormData = {
  fp: "",
  fn: "",
  fd: "",
  date: "",
  time: "",
  sum: "",
};
const form = ref<ICheckFormData>(initial);

const isError = (name: string) => {
  return !!Object.keys(errors).length && errors.hasOwnProperty(name);
};
const error = (name: string) => {
  return isError(name) ? errors[name][0] : "";
};

const handleSubmit = async () => {
  const formData = new FormData();

  files.value?.forEach((value, index) => {
    console.log(value);
    formData.append("files[" + index + "]", value);
  });
  formData.append("fp", form.value.fp);
  formData.append("fn", form.value.fn);
  formData.append("i", form.value.fd);
  formData.append("date", form.value.date);
  formData.append("time", form.value.time);
  formData.append("s", form.value.sum);
  formData.append("t", t.value);

  await store
    .checkRegister(formData)
    .then((res: any) => {
      if (res.success) {
        gtag("event", "check", { event_category: "send_form" });
        close("check");
      }
    })
    .catch((error) => {
      if (error.value?.data.errors)
        Object.entries(error.value?.data.errors).forEach((item: any) => {
          errors[item[0]] = item[1];
        });
    });
};
const onDecodeDropzone = (data: File[]) => {
  QrScanner.scanImage(data[0])
    .then((result) => {
      let newDate;
      qrData.value = result.split("&");
      newDate = qrData.value.map((value) => {
        return value.split("=");
      });
      handleFormFromQr(newDate);
    })
    .catch((error) => console.log(error));

  files.value = data;
  qrText.value = true;
  isShowCheckForm.value = true;
};
const onDecode = (event: any) => {
  QrScanner.scanImage(event.target.files[0])
    .then((result) => {
      let newDate;

      console.log(result);
      qrData.value = result.split("&");

      newDate = qrData.value.map((value) => {
        return value.split("=");
      });
      handleFormFromQr(newDate);
    })
    .catch((error) => {
      console.log(error);
    });

  files.value = event.target.files;
  qrText.value = true;
  isShowCheckForm.value = true;
};
const onDecodeStream = (decodedString: string) => {
  result.value = decodedString;

  let newDate: string[][];
  qrData.value = decodedString.split("&");

  newDate = qrData.value.map((value) => {
    return value.split("=");
  });
  handleFormFromQr(newDate);
  qrText.value = true;
  isShowCheckForm.value = true;
};
const handleFormFromQr = (data: string[][]) => {
  data.forEach((value) => {
    if (value[0] === "fn") {
      form.value.fn = value[1];
    }
    if (value[0] === "fp") {
      form.value.fp = value[1];
    }
    if (value[0] === "i") {
      form.value.fd = value[1];
    }
    if (value[0] === "s") {
      form.value.sum = value[1];
    }
    if (value[0] === "t") {
      t.value = value[1];
      let chDate = value[1].split("T")[0].split("");
      let chTime = value[1].split("T")[1].split("");

      form.value.date =
        chDate[6] +
        chDate[7] +
        "." +
        chDate[4] +
        chDate[5] +
        "." +
        chDate[0] +
        chDate[1] +
        chDate[2] +
        chDate[3];
      form.value.time = chTime[0] + chTime[1] + ":" + chTime[2] + chTime[3];
    }
  });
};

const reset = () => {
  isShowCheckForm.value = false;
  qrText.value = false;
  result.value = "";
  t.value = "";
  qrData.value = [];
  errors = {};
  form.value = initial;
};

withDefaults(defineProps<Props>(), {
  clickToClose: true,
  escToClose: true,
  accept: "image/png",
});

const rules = computed(() => {
  const rulesDesktop = [
    "Нажмите на область “Перетащите фото чека или нажмите для выбора” и выберите фото чека",
    "Если чек длинный, сделайте несколько последовательных фото",
    "Если на чеке есть QR-код, сделайте фото отдельным кадром",
    "Если фото окажется плохого качества, чек принят не будет",
  ];

  const rulesMobile = [
    "Наведите камеру на QR-код чека или выберите варианты загрузки ниже",
    "Если не удалось отсканировать QR-код — загрузите фото отдельным кадром",
    "Если фото окажется плохого качества — чек принят не будет",
  ];

  return type.value === "mobile" ? rulesMobile : rulesDesktop;
});
</script>

<style lang="scss">
.check {
  .dropzone__box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
    background: var(--color-white);
    border: 2px dashed var(--color-green);
    border-radius: 3px;
    cursor: pointer;
  }

  .dropzone__item-thumbnail {
    width: 108px;
    height: 108px;
    border-radius: 0;
  }

  .dropzone__details--style {
    font-family: var(--font-regular);
  }
}
</style>

<style lang="scss" scoped>
.check {
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
  }

  &__content {
  }

  &__upload {
    margin-top: 20px;

    input {
      display: none;
    }
  }

  &__upload-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-regular);
    font-style: normal;
    font-weight: 700;
    text-align: center;
    transition: all var(--transition-duration) ease;
    cursor: pointer;
    border-radius: 10px;
    text-transform: uppercase;
    padding: 8px 16px;
    background-color: var(--color-red);
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: var(--color-white);
    width: fit-content;
    margin: 0 auto;

    @include md {
      padding: 12px 20px;
      font-size: 21px;
      line-height: 24px;
    }
  }

  &__dropzone {
    margin-bottom: 42px;
  }

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.rules-list {
  margin-bottom: 28px;
  font-family: var(--font-regular);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: var(--color-black);

  &__item {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}

.dropzone-text {
  max-width: 267px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: var(--color-gray);
  margin: auto;

  &.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}

.check-form {
  &__title {
    margin-bottom: 23px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 50px;
    color: var(--color-black);
  }

  &__field {
    &:not(:last-of-type) {
      margin-bottom: 13px;
    }

    &:last-child {
      margin-bottom: 40px;
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
