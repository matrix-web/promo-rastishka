<template>
  <div class="input">
    <VField
      :modelValue="localValue"
      @input="handleInput"
      :name="name"
      :rules="rules"
      :type="type"
      v-slot="{ field, meta }"
    >
      <input
        v-if="!!mask"
        :class="[
          'input-field',
          {
            error: isError || (!meta.valid && meta.touched),
            success: isSuccess || (meta.valid && meta.touched),
            search: isSearch
          }
        ]"
        v-mask="mask"
        v-bind="field"
        :masked="!!mask"
        :type="type"
        :placeholder="placeholder"
      />
      <input
        v-else
        :class="[
          'input-field',
          {
            error: isError || (!meta.valid && meta.touched),
            success: isSuccess || (meta.valid && meta.touched),
            search: isSearch
          }
        ]"
        v-bind="field"
        :type="type"
        :placeholder="placeholder"
      />
      <button @click="handleClick" v-if="isSearch" class="button-search">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
            stroke="#E42221"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
            stroke="#E42221"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <span class="input-error" v-if="isError">{{ error }}</span>
      <VErrorMessage class="input-error" :name="name" as="div" />
    </VField>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "#imports";

interface Props {
  name: string
  modelValue: string
  placeholder?: string
  isDisabled?: boolean
  isError?: boolean
  isSuccess?: boolean
  isSearch?: boolean
  autocomplete?: string
  rules?:
    | string
    | { [key: string]: boolean }
    | { [key: string]: { [key: string]: number | string | boolean } }
  mask?: string
  error?: string
  type?: 'text' | 'password'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Личный кабинет",
  isError: false,
  isSuccess: false,
  isSearch: false,
  isDisabled: false,
  autocomplete: 'off',
  mask: '',
  type: 'text'
})

const localValue = ref<string>(props.modelValue);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'on-search'): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const handleClick = () => emit("on-search");

watch(
  () => props.modelValue,
  (value) => {
    localValue.value = value;
  }
);
</script>

<style lang="scss" scoped>
.input {
  position: relative;
}

.input-field {
  width: 100%;
  font-family: var(--font-regular);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: var(--color-black);
  padding: 13px 21px;
  border: 1px solid transparent;
  border-radius: 60px;
  background-color: var(--color-gray-100);
  transition: var(--transition-duration) ease;

  &.search {
    padding-right: 50px;
    background: var(--color-white);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: var(--color-gray);
  }

  &:focus {
    border-color: var(--color-gray);
  }

  &.error {
    border-color: var(--color-red);
  }

  &.success {
    border-color: var(--color-light-green);
  }
}

.input-error {
  padding-left: 20px;
  padding-top: 3px;
  font-size: 12px;
  line-height: 1.2;
  color: var(--color-red);
}

.button-search {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
