<template>
  <section class="info-block">
    <p class="info-block__step" :data-text="step">{{ step }}</p>
    <TheTitle class-name="info-block__title" is-upper-case :level="3">{{
      title
    }}</TheTitle>
    <p class="info-block__text">
      {{ description }}
    </p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  step: number
  title: string
  description: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.info-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 325px;
  font-family: var(--font-regular);
  margin: 0 auto;

  @include md {
    max-width: 260px;
    margin: initial;
  }

  @include lg {
    max-width: 325px;
  }

  &__step {
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 60px;
    color: var(--color-blue);
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

  &__text {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: var(--color-blue);

    @include xl {
      font-size: 32px;
      line-height: 37px;
    }
  }
}
</style>
