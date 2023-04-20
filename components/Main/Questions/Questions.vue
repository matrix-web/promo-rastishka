<template>
  <section class="questions" id="questions">
    <div class="container">
      <header class="questions__header">
        <TheTitle :level="2" is-upper-case is-stroke text="вопрос-ответ"
          >Вопрос-ответ</TheTitle
        >
      </header>
      <Accordion
        is-multiple
        class="questions__accordion"
        :items="questionList"
      />
      <p class="questions__info">
        *Общий период совершения покупок и регистрация кассовых чеков с 15
        апреля по 12 мая 2023 года. В розыгрышах участвуют призы: велосипед х10
        шт, плед х20, рюкзак х10, комплект мебели х 20 шт, самокат х10 шт,
        постельное белье х20 шт, главный приз 100 000 рублей х1 шт.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { questionList } from '@/helpers/mocks'
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  padding: 0 15px;

  @include s {
    padding: 0 20px;
  }

  @include md {
    max-width: 730px;
    margin: 0 auto;
    padding: 0;
  }

  @include lg {
    max-width: 952px;
  }

  @include xl {
    max-width: 1120px;
  }
}

.questions {
  position: relative;
  overflow: hidden;
  padding: 26px 0;
  background-image: url('@/assets/images/backgrounds/background-green-bottom.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;

  @include md {
    padding: 26px 0 40px;
  }

  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    z-index: 10;
  }

  &__accordion {
    position: relative;
    margin-bottom: 24px;
    z-index: 10;

    @include md {
      margin-bottom: 30px;
    }
  }

  &__info {
    position: relative;
    z-index: 10;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.03em;
    color: var(--color-white);
    text-shadow: 0px 0px 11px rgba(0, 0, 0, 0.65);
  }

  &__background {
    position: absolute;
    left: 0;
    top: -3px;
    z-index: -1;

    img {
      width: 100vw;
      min-height: 850px;
    }
  }
}
</style>
