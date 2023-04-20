<template>
  <span
    :class="[
      'loader',
      `m-${size}`,
      `color-outer-${colorOuter}`,
      `color-inner-${colorInner}`
    ]"
  ></span>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  size: {
    type: String as PropType<'s' | 'm' | 'l'>,
    default: 's'
  },
  colorOuter: {
    type: String,
    default: 'black'
  },
  colorInner: { type: String, default: 'red' }
})
</script>

<style lang="scss" scoped>
.loader {
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &.color-outer-white {
    border-top-color: var(--color-white);
  }
  &.color-outer-black {
    border-top-color: var(--color-black);
  }
  &.color-outer-red {
    border-top-color: var(--color-red);
  }
  &.color-outer-blue {
    border-top-color: var(--color-blue);
  }
  &.color-outer-dark-blue {
    border-top-color: var(--color-dark-blue);
  }
  &.color-outer-green {
    border-color: var(--color-green);
  }
  &.color-outer-light-green {
    border-top-color: var(--color-light-green);
  }
  &.color-outer-gray {
    border-top-color: var(--color-gray);
  }
  &.color-outer-gray-100 {
    border-top-color: var(--color-gray-100);
  }
  &.color-outer-gray-600 {
    border-top-color: var(--color-gray-600);
  }

  &.color-inner-white {
    &::after {
      border-left-color: var(--color-white);
    }
  }
  &.color-inner-black {
    &::after {
      border-left-color: var(--color-black);
    }
  }
  &.color-inner-blue {
    &::after {
      border-left-color: var(--color-blue);
    }
  }
  &.color-inner-red {
    &::after {
      border-left: 4px solid var(--color-red);
    }
  }

  &.color-inner-dark-blue {
    &::after {
      border-left-color: var(--color-dark-blue);
    }
  }
  &.color-inner-green {
    &::after {
      border-left-color: var(--color-green);
    }
  }
  &.color-inner-light-green {
    &::after {
      border-left-color: var(--color-light-green);
    }
  }
  &.color-inner-gray {
    &::after {
      border-left-color: var(--color-gray);
    }
  }
  &.color-inner-gray-100 {
    &::after {
      border-left-color: var(--color-gray-100);
    }
  }
  &.color-inner-gray-600 {
    &::after {
      border-left-color: var(--color-gray-600);
    }
  }

  &.m-s {
    width: 25px;
    height: 25px;
    &::after {
      width: 25px;
      height: 25px;
    }
  }
  &.m-m {
    width: 39px;
    height: 39px;
    &::after {
      width: 39px;
      height: 39px;
    }
  }
  &.m-l {
    width: 55px;
    height: 55px;
    &::after {
      width: 55px;
      height: 55px;
    }
  }
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  border-left: 4px solid transparent;
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
