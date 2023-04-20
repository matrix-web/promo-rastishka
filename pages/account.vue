<template>
  <section class="account">
    <div class="container">
      <header class="account__header">
        <TheTitle :level="2" is-upper-case is-stroke text="Личный кабинет"
          >Личный кабинет</TheTitle
        >
      </header>
      <div class="account__content">
        <div class="account__info">
          <PersonalData class="account__personal-data" />
          <div class="account__info-button">
            <Button variant="secondary" @click="handleCheckRegister"
              >Зарегистрировать чек</Button
            >
          </div>
        </div>
        <div class="account__check-status">
          <p
            class="account__check-status-title"
            :data-text="`У вас уже зарегистрирован${pluralizeRussianWord(
              store.checkAcceptCount,
              ['', 'о', 'о']
            )}  ${store.checkAcceptCount} чек${pluralizeRussianWord(
              store.checkAcceptCount,
              ['', 'а', 'ов']
            )}`"
          >
            У вас уже
            {{
              `зарегистрирован${pluralizeRussianWord(store.checkAcceptCount, [
                '',
                'о',
                'о'
              ])}`
            }}
            <span :data-text="store.checkAcceptCount">{{
              store.checkAcceptCount
            }}</span>
            {{
              `чек${pluralizeRussianWord(store.checkAcceptCount, [
                '',
                'а',
                'ов'
              ])}`
            }}
          </p>
          <CheckStatus variant="secondary" :count="store.checkAcceptCount" />
          <div class="account__check-status-button" v-if="store.isCheckAccept">
            <p class="account__check-text" data-text="Диджитал раскраска">
              Диджитал раскраска
            </p>
            <Button @click="downLoadFile" variant="secondary">Скачать</Button>
          </div>
        </div>
      </div>
      <div class="loaded-check">
        <div class="loaded-check__title-wrapper">
          <TheTitle :level="2" is-upper-case is-stroke text="Загруженные чеки"
            >Загруженные чеки</TheTitle
          >
        </div>
        <TableReceipt :headers="checkTableHeaders" :receipts="store.receipts" />
      </div>
    </div>

    <picture class="account__bg account__bg--apple">
      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/apple-1024.png 1x"
        type="image/png"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/apple-1024.webp 1x"
        type="image/webp"
      />

      <img
        src="@/assets/images/decor/apple-1440.png"
        srcset="@/assets/images/decor/apple-1440.png 1x"
        alt="apple"
      />
    </picture>

    <picture class="account__bg account__bg--plum">
      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/plum-lk-1024.png 1x"
        type="image/png"
      />

      <source
        media="(min-width: 1024px)"
        srcset="@/assets/images/decor/plum-lk-1024.webp 1x"
        type="image/webp"
      />

      <img
        src="@/assets/images/decor/plum-rotated.png"
        srcset="@/assets/images/decor/plum-rotated.png 1x"
        alt="apple"
      />
    </picture>
  </section>
</template>

<script setup lang="ts">
import PersonalData from '~/components/account/PersonalData.vue'
import TableReceipt from '~/components/account/TableReceipt.vue'
import { checkTableHeaders } from '~/data/loadedCheck'
import { definePageMeta, onMounted } from '#imports'
import { useVfm } from 'vue-final-modal'
import { useMainStore } from '~/store'
import { pluralizeRussianWord } from '~/utils'

const FILE_PATH = `https://storage.yandexcloud.net/rastishka/%D0%A0%D0%B0%D1%81%D1%82%D0%B8%D1%88%D0%BA%D0%B0.pdf`

definePageMeta({
  middleware: 'auth'
})

const { open } = useVfm()
const store = useMainStore()

const handleCheckRegister = () => {
  if (store.isAuth) {
    open('check')
  } else {
    open('alert')
  }
  gtag('event', 'check_lk', { event_category: 'click_button' })
}

const downLoadFile = () => {
  gtag('event', 'paint', { event_category: 'click_button' })

  const a = document.createElement('a')
  a.href = FILE_PATH
  a.target = '_blank'
  a.download = `${'digital-coloring-book'}.pdf`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

onMounted(async () => {
  await store.getChecks()
})
</script>

<style scoped lang="scss">
.account {
  position: relative;
  padding: 35px 0 100px;
  background-image: url('@/assets/images/backgrounds/account-bg.png');
  background-size: cover;
  background-repeat: no-repeat;

  @include s {
    padding: 35px 0 60px;
  }

  @include md {
    padding: 74px 0 67px;
  }

  @include xl {
    padding: 74px 0 71px;
  }

  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;

    @include md {
      margin-bottom: 42px;
    }

    @include xl {
      margin-bottom: 26px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-bottom: 58px;

    @include md {
      margin-bottom: 70px;
    }

    @include lg {
      flex-direction: row;
    }

    @include xl {
      margin-bottom: 74px;
    }
  }

  &__personal-data {
    margin-bottom: 27px;
  }

  &__info {
    max-width: 413px;
    margin-bottom: 35px;
    padding: 0 15px;

    @include md {
      padding: 0;
    }

    @include lg {
      margin-right: 32px;
      margin-bottom: 0;
    }

    &-button {
      display: flex;
      justify-content: center;
    }
  }

  &__check-status {
    flex: 1;
    padding: 0 12px;

    &-title {
      position: relative;
      margin-bottom: 61px;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      color: var(--color-blue);
      text-transform: uppercase;
      text-align: center;
      z-index: 0;

      @include md {
        margin-bottom: 91px;
        font-size: 28px;
        line-height: 32px;
      }

      span {
        display: inline-block;
        position: relative;
        z-index: 0;
        color: var(--color-red);

        &::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          right: 0;
          z-index: -1;
          -webkit-text-stroke: 6px var(--color-white);
        }
      }

      &::before {
        content: attr(data-text);
        position: absolute;
        left: 0;
        right: 0;
        z-index: -1;
        -webkit-text-stroke: 6px var(--color-white);
      }
    }

    &-button {
      display: inline-block;
      position: relative;
      z-index: 5;
      margin-top: 32px;
    }
  }

  &__check-text {
    position: relative;
    max-width: 86px;
    margin: 0 auto 10px auto;
    z-index: 0;
    font-weight: 700;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    color: var(--color-blue);

    @include md {
      font-size: 18px;
    }

    &::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      right: 0;
      z-index: -1;
      -webkit-text-stroke: 6px var(--color-white);
    }
  }

  &__bg {
    position: absolute;

    &--apple {
      display: none;

      @include lg {
        display: block;
        right: 0;
        top: 38%;
      }
    }

    &--plum {
      display: none;

      @include lg {
        display: block;
        left: 0;
        top: 5%;
      }

      @include xl {
        top: 25%;
      }
    }
  }
}

.loaded-check {
  &__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 27px;

    @include xl {
      margin-bottom: 40px;
    }
  }
}

.container {
  @include md {
    max-width: 730px;
    margin: 0 auto;
    padding: 0;
  }
  @include lg {
    max-width: 953px;
    margin: 0 auto;
  }
  @include xl {
    max-width: 1120px;
    margin: 0 auto;
  }
}
</style>
