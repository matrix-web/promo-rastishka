<template>
  <section class="personal-data">
    <p class="personal-data__title" role="title">Персональные данные</p>
    <ul class="personal-data__list">
      <li class="personal-data__item">
        <span>Имя:</span>{{ store.user ? store.user?.name : 'xxxxxxx' }}
      </li>
      <li class="personal-data__item">
        <span>E-mail:</span
        >{{ store.user ? store.user?.email : 'хххххх@xxxx.xx' }}
      </li>
      <li class="personal-data__item">
        <span>Мобильный телефон:</span
        >{{ store.user ? formatPhone(store.user?.phone) : '+xxxxxxxxxxx' }}
      </li>
      <li class="personal-data__item">
        <span>Город:</span>{{ store.user ? store.user?.city : 'xxxxxxxxxx' }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store'
import { formatPhone } from '~/utils'

const store = useMainStore()
</script>

<style scoped lang="scss">
.personal-data {
  max-width: 413px;
  padding: 15px 18px;
  background: var(--color-white);
  box-shadow: 0px 10px 12px rgba(168, 199, 201, 0.18);
  border-radius: 20px;
  @include md {
    padding: 15px 20px;
  }
  @include lg {
    padding: 15px 23px 30px;
  }

  &__title {
    font-weight: 700;
    font-size: 22px;
    line-height: 50px;
    color: var(--color-black);
    text-align: center;

    @include md {
      font-size: 24px;
    }
  }

  &__item {
    font-weight: 400;
    font-size: 13px;
    line-height: 34px;
    color: var(--color-black);

    @include s {
      font-size: 16px;
      line-height: 43px;
    }

    @include md {
      fons-size: 18px;
    }

    span {
      display: inline-block;
      margin-right: 19px;
      font-weight: 700;
    }
  }
}
</style>
