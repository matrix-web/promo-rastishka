<script setup lang="ts">
import { useVfm } from "vue-final-modal";

const { open } = useVfm();

const handleFeedback = () => {
  open("claim");
  gtag("event", "feedback", { event_category: "click_button" });
};
</script>

<template>
  <footer class="footer">
    <picture>
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/background-red-s.webp 1x"
        sizes="100vw"
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        srcset="@/assets/images/backgrounds/background-red-s.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/background-red-m.png 1x"
        sizes="100vw"
        type="image/png"
      />
      <source
        media="(min-width: 768px)"
        srcset="@/assets/images/backgrounds/background-red-m.webp 1x"
        sizes="100vw"
        type="image/webp"
      />
      <img
        class="footer__background"
        loading="lazy"
        src="@/assets/images/backgrounds/background-red-m.png"
        srcset="@/assets/images/backgrounds/background-red-m.png 1x"
        alt="background"
        sizes="100vw"
      />
    </picture>

    <div class="container footer__container">
      <a class="footer__link" href="/rules.pdf" target="_blank"
        >Правила акции</a
      >
      <a class="footer__link" href="/policy.pdf" target="_blank"
        >Политика конфиденциальности</a
      >
      <button class="footer__link" @click="handleFeedback">
        Задать вопрос
      </button>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  overflow: hidden;
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
    padding: 25px;
    align-items: flex-start;

    @include lg {
      flex-direction: row;
      justify-content: center;
    }

    @include xl {
      justify-content: flex-start;
      padding-left: 160px;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    background-color: var(--color-red);
  }

  &__link {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: var(--color-white);
    font-family: inherit;

    &:not(:last-child) {
      margin-bottom: 13px;

      @include lg {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }
  }
}
</style>
