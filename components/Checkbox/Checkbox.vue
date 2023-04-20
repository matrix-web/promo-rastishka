<template>
  <label class="checkbox">
    <VField
      :checked="modelValue"
      @change="handleChange"
      :name="name"
      :rules="rules"
      :disabled="isDisabled"
      :value="value"
      v-slot="{ field, meta }"
    >
      <input type="checkbox" v-bind="field" class="checkbox__field" />
      <span :class="['checkbox__control', { error: isError || !meta.valid && meta.touched }]">
        <svg
          class="checkbox__icon"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.07129 5.35728L3.57129 7.85728L9.28557 1.42871"
            stroke="white"
            stroke-width="2.14286"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <VErrorMessage class="checkbox-error" :name="name" as="div" />
    </VField>
    <span class="checkbox__text">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean;
  name: string;
  value?:
    | Array<string | number | Object | boolean>
    | string
    | number
    | Object
    | boolean;
  isDisabled?: boolean;
  isError?: boolean;
  rules?:
    | string
    | { [key: string]: boolean }
    | { [key: string]: { [key: string]: number | string | boolean } };
}

withDefaults(defineProps<Props>(), {
  name: "",
  label: "",
  isDisabled: false,
  isError: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const handleChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  &__field {
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    z-index: -1;
    opacity: 0;

    &:disabled + .checkbox__control {
      cursor: not-allowed;
    }

    &:disabled:checked + .checkbox__control {
      background-color: var(--color-gray);
    }

    &:checked + .checkbox__control {
      background-color: var(--color-red);
      .checkbox__icon {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  &__control {
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 1px;
    background-color: var(--color-gray-100);
    border: 1px solid transparent;
    margin-right: 12px;
    transition: var(--transition-duration);

    &.error {
      border-color: var(--color-red);
    }
  }

  &-error {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-size: 12px;
    line-height: 1.2;
    color: var(--color-red);
  }

  &__text {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: var(--color-black);
  }

  &__icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: var(--transition-duration) ease;
  }
}
</style>
