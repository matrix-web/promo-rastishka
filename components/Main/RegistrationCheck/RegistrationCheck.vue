<template>
  <section class="registration-check">
    <div class="container">
      <header class="registration-check__header">
        <TheTitle
          class="registration-check__title"
          :level="2"
          is-stroke
          is-upper-case
          text="Регистрируйте чеки и принимайте участие в розыгрыше призов"
        >
          Регистрируйте чеки и принимайте участие в розыгрыше призов
        </TheTitle>
        <p class="registration-check__subtitle" v-if="store.isAuth">
          У Вас уже
          {{
            `зарегистрирован${pluralizeRussianWord(store.checkAcceptCount, [
              '',
              'о',
              'о'
            ])}`
          }}
          <span>{{ store.checkAcceptCount }}</span>
          {{
            `чек${pluralizeRussianWord(store.checkAcceptCount, [
              '',
              'а',
              'ов'
            ])}`
          }}
          для участия в розыгрыше главного приза
        </p>
      </header>
      <CheckStatus :count="store.checkAcceptCount" />
      <div class="registration-check__action">
        <Button variant="secondary" @click="$emit('register')"
          >Зарегистрировать чек</Button
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CheckStatus from '~/components/CheckStatus/CheckStatus.vue'
import { useMainStore } from '~/store'
import { pluralizeRussianWord } from '~/utils'

const store = useMainStore()
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  padding: 0 10px;

  @include md {
    max-width: 730px;
    margin: 0 auto;
    padding: 0;
  }

  @include lg {
    max-width: 952px;
    margin: 0 auto;
  }

  @include xl {
    max-width: 1120px;
    margin: 0 auto;
  }
}

.registration-check {
  position: relative;
  padding: 67px 0 80px;
  overflow: hidden;
  background-image: url('@/assets/images/backgrounds/light-1440.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: 50%;

  @include s {
    padding: 67px 0 90px;
  }

  @media (min-width: 480px) {
    background-position-x: 40%;
  }

  @include md {
    background-position-x: initial;
  }

  @include lg {
    padding: 122px 0 160px;
  }

  &__header {
    text-align: center;
    max-width: 780px;
    margin: 0 auto 50px auto;

    @include lg {
      margin: 0 auto 106px auto;
    }
  }

  &__title {
    @include s {
      margin-bottom: 8px;
    }

    @include lg {
      margin: 0;
    }
  }

  &__subtitle {
    max-width: 456px;
    margin: 0 auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    color: var(--color-blue);

    span {
      color: var(--color-red);
    }

    @include s {
      font-size: 18px;
      line-height: 21px;
    }

    @include lg {
      font-size: 24px;
      line-height: 28px;
    }
  }

  &__action {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    z-index: 10;

    @include md {
      margin-bottom: 45px;
    }
  }

  &__background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;

    @include md {
      img {
        width: 100vw;
      }
    }
  }
}
</style>
