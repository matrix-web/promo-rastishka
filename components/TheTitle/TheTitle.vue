<template>
  <component
    :class="[
      `${className}`,
      'title',
      `title-${level}`,
      { uppercase: isUpperCase },
      { stroke: isStroke }
    ]"
    :is="tag"
    :style="{ color: color ? `var(--color-${color})` : null }"
    :data-text="text"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  className?: string | { [key: string]: boolean | null }
  isUpperCase?: boolean
  isStroke?: boolean
  level?: 1 | 2 | 3 | 4 | 5 | 6
  text?: string
}

const { level, color, isStroke, isUpperCase, className } = withDefaults(
  defineProps<Props>(),
  {
    color: 'blue',
    className: '',
    text: '',
    isStroke: false
  }
)

const tag = computed(() => `h${level}`)
</script>

<style lang="scss" scoped>
.title {
  font-family: var(--font-regular);
  color: var(--color-blue);
  font-style: normal;
  font-weight: 700;

  &.uppercase {
    text-transform: uppercase;
  }

  &.stroke {
    position: relative;
    z-index: 0;

    &::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      right: 0;
      z-index: -1;
      -webkit-text-stroke: 10px var(--color-white);
    }
  }

  &-1 {
    font-size: 47px;
    line-height: 60px;
  }

  &-2 {
    font-size: 24px;
    line-height: 1.2;

    @include s {
      font-size: 30px;
      line-height: 1.2;
    }

    @include lg {
      font-size: 44px;
      line-height: 60px;
    }
  }

  &-3 {
    font-size: 30px;
    line-height: 50px;

    @include lg {
      font-size: 36px;
      line-height: 50px;
    }

    @include xl {
      font-size: 40px;
    }
  }

  &-4 {
    font-size: 24px;
    line-height: 1.2;

    @include s {
      font-size: 30px;
      line-height: 34px;
    }

    @include lg {
      font-size: 36px;
      line-height: 50px;
    }

    @include xl {
      font-size: 38px;
    }
  }

  &-5 {
    font-size: 32px;
    line-height: 32px;
  }

  &-6 {
    font-size: 28px;
    line-height: 32px;
  }
}
</style>
