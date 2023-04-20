<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
    validator(value: string) {
      return ['button', 'submit'].includes(value)
    }
  },
  variant: {
    type: String,
    default: 'primary',
    validator(value: string) {
      return ['primary', 'secondary'].includes(value)
    }
  },
  isRounded: {
    type: Boolean,
    default: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  isSmall: {
    type: Boolean,
    default: false
  },
  isUpperCase: {
    type: Boolean,
    default: false
  },
  isBlock: {
    type: Boolean,
    default: false
  },
  isOutline: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'click', ev: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => emit('click', event)
</script>

<template>
  <button
    :class="[
      'button',
      variant,
      {
        rounded: isRounded,
        uppercase: isUpperCase,
        small: isSmall,
        block: isBlock,
        outline: isOutline
      }
    ]"
    :disabled="isDisabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-regular);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  transition: all var(--transition-duration) ease;
  cursor: pointer;

  &.rounded {
    border-radius: 10px;
  }

  &.small {
    font-size: 16px !important;
    line-height: 18px !important;
  }

  &.uppercase {
    text-transform: uppercase;
  }

  &.block {
    width: 100%;
  }

  &.primary {
    background-color: var(--color-white);
    padding: 14px 37px;

    &:not(:disabled):hover {
      color: var(--color-red);
    }

    &.outline {
      background-color: transparent;
      border: 1px solid var(--color-white);
      color: var(--color-white);

      &:not(:disabled):hover {
        color: var(--color-white);
      }
    }
  }

  &.secondary {
    padding: 8px 16px;
    background-color: var(--color-red);
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: var(--color-white);

    &:not(:disabled):hover {
      background-color: rgba(222, 26, 61, 0.8);
    }

    @include md {
      padding: 12px 20px;
      font-size: 21px;
      line-height: 24px;
    }
  }

  &:disabled {
    background-color: var(--color-gray);
    cursor: not-allowed;
  }
}
</style>
